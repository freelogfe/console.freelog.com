# 开发指南

## 开发环境

* nodejs
* 现代高级浏览器（需支持web component、fetch）


### 环境区分

- ** *.freelog.com **为线上环境
- ** *.testfreelog.com **为测试环境


## 构建部署

#### console.freelog.com

* 第一步，构建打包
```sh
$ npm run build
```
* 第二步，提交到服务器，线上为``/data/web/console.freelog.com``，测试环境为``/data/web/console.testfreelog.com``
* 第三步，在服务器提交目录下，执行
```sh
$ sh extract.sh # 线上


$ sh dev-extract.sh #测试
```
* done


#### www.freelog.com
* 第一步，构建打包

```sh
$ npm run build
```

* 第二步，提交到ali OSS frcdn容器，将dist/public放进OSS的public目录，dist/pagebuild放到OSS的pagebuil目录。
* done


