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

1.JSON.parse 方法的参数只能是字符串否则报错 2019-08-30
2.webpack 打包时是静态编译必须找到所有引用文件否则会报错 比如 引入一个路径 require（“xxx”）必须是写死的字符串路径，解决方法用模板字符串
3.vue 中修改引用类型数据时应该使用 vue.set 方法，否则无法驱动视图
4.element ui el-backtop 组件的坑 （https://blog.csdn.net/qq348843576/article/details/100662116）
5.vue router 路由守卫 结束状态必须由 next()方法触发 next（XXX）带任何参数都是跳转 会进入死循环

### 用到的插件

vuescroll 滚动条 (https://vuescrolljs.yvescoding.org/zh/)
vue-fragment 解决侧边栏折叠时显示文字 （https://blog.csdn.net/pangji0417/article/details/93353327）
loadsh 只使用了防抖函数

### 页面状态控制按钮与表单状态逻辑

初始状态由新增页面存入 Vuex,按钮组件和表单组件分别从 vuex 中获取到初始状态,再由按钮组件更新状态存入 vuex。
新增页面组件销毁时初始化 Vuex 中的页面状态

### 待解决问题

loash 按需加载,防抖优化 是否使用 element ui 按钮的 loading 状态，表格加载数据时 loading 状态
组件化 新增 ,查询页面模板
表单，网格字段可配置
api 统一封装,
表单验证，点名人所属人员为空时提示
等等....

### 疑问

组件销毁后再创建 props 有缓存？还是 element ui dialog 的销毁组件有问题。
vue 官方提供的与 vuex 中数据双向绑定的方法 利用 computed set 方法 好像无法实现双向绑定？（其他组件改变 vuex 中数据计算属性 set 不触发）现使用 watch 实现。
相同组件用相同 ref，不同组件用相同 ref 有什么区别
