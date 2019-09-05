# new-discovery

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 遇到问题及注意事项

JSON.parse 方法的参数只能是字符串否则报错 2019-08-30
webpack 打包时是静态编译必须找到所有引用文件否则会报错 比如 引入一个路径 require（“xxx”）必须是写死的字符串路径，解决方法用模板字符串

###用到的插件

vuescroll 滚动条 (https://vuescrolljs.yvescoding.org/zh/)
