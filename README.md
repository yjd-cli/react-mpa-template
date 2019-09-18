### public 
该目录下放置一些不会被 webpack 打包处理的静态资源，是真正的静态资源，一般是第三方库；可以用 绝对路径引用（cdn）
https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9

### assets 
该目录下放置一些会被 webpack 打包处理的静态资源，一般是自己写的 js、css或者图片等静态资源

#### 什么时候需要代码分割
单页面的话：如果不做异步加载，那么是没有必要拆分 chunk 的
多页面或者要做异步加载（其实就是会生成多个 chunk 时），那就需要拆分 chunk

#### 开发环境和生产环境
开发环境：不需要提前公共代码和代码分割

