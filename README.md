# bashboard

> dashboard of freelog

## features

- SPA
- [Vue2](https://github.com/vuejs/vue)
- [Webpack3](https://github.com/webpack/webpack)
- [ElementUI](https://github.com/ElemeFE/element)
- vuex
- vue-router
- axios

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 开发

### 开发一个页面
- 创建vue file
- 将vue实例在views/index.js输出
- 在router目录下，添加对应的路由，导入对应的vue实例，将vue实例挂载到router的component上


## 部署（临时方案）

打包

```sh
$ npm run build
$ npm run pack
```

构建打包后之后，将console.tar提交到服务器/data/web目录后，在服务器的/data/web目录下执行

```sh
$ sh extract.sh
```

### todo

aliyun oss构建自动部署


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
