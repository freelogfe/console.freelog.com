const oss = require('ali-oss');
const walk = require('walk')
const ora = require('ora');
const consola = require('consola')
const userHome = require('user-home')
const logger = consola.withScope('deploy')
const {existsSync} = require('fs')
const path = require('path')
const assert = require('assert')
const {execSync} = require('child_process')
const dist = path.join(__dirname, '../dist')
const cwd = process.cwd()

function getOSSAccessFile() {
  const filename = 'oss-config'
  const files = [path.join(cwd, filename), path.join(userHome, '.freelog', filename)].reduce((files, dir) => {
    return files.concat(['.js', '.json'].map(ext => `${dir}${ext}`))
  }, [])

  for (let i = 0; i < files.length; i++) {
    if (existsSync(files[i])) {
      return files[i]
    }
  }

  return null
}


function getOssConfig(isProd) {
  const accessFile = getOSSAccessFile()
  assert(accessFile, 'not found oss access config file')
  const accessConfig = require(getOSSAccessFile())
  return Object.assign({
    bucket: isProd ? 'frcdn' : 'test-frcdn',
    region: 'oss-cn-shenzhen'
  }, accessConfig)
}

function getGitBranchName() {
  var name = execSync(`git branch | grep '*' | sed 's/* //'`).toString()
  return name.trim()
}

function gitBranchIs(branchName) {
  return branchName === getGitBranchName()
}

function build(env) {
  const spinner = ora(`building for ${env}...`).start();
  const res = execSync(`npm run build:${env}`)
  spinner.succeed('build complete')
  return res.toString().includes('Build complete')
}

function uploadDir(dir, isProd) {
  return new Promise(resolve => {
    var walker = walk.walk(dir);
    var promises = []
    const store = oss(getOssConfig(isProd));

    walker.on('file', (root, fileState, next) => {
      const local = path.join(root, fileState.name)
      const target = path.relative(dir, local)
      const promise = store.put('console/'+target, local)
      promises.push(promise)
      next()
    })

    walker.on("end", function () {
      Promise.all(promises).then(resolve)
    })
  })
}

async function run() {
  const isProd = gitBranchIs('publish')
  const isDaily = gitBranchIs('daily')
  const env = (isProd && 'prod') || (isDaily && 'beta') || ''

  const spinner = ora('publish...').start();
  await uploadDir(dist, isProd)
  spinner.succeed(`publish to ${env} complete`)
  //
  // if (env && build(env)) {
  //   const spinner = ora('publish...').start();
  //   await uploadDir(dist, isProd)
  //   spinner.succeed(`publish to ${env} complete`)
  // }
}

process.on('uncaughtException', function (err) {
  logger.error(err.stdout.toString())
  logger.error(err.stderr.toString())
})

run()