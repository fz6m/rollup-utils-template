# rollup-utils-template

*version: TypeScript* 

一个用 rollup 构建 工具或功能库 的起始模板，节省初始配置构建环境的时间。

### 使用

在 `src/index.ts` 入口处进行管理。

```bash
    # 常规构建， css 会被抽取至 dist/css 下
    yarn build

    # 内联构建， css 会被内联自动注入页面 <head>
    yarn build:inline
```

最终将会构建至 `./dist` 下：

类型|文件名
:-:|:-:
cjs|name.cjs.js
cjs|name.cjs.min.js
umd|name.umd.js
umd|name.umd.min.js
esm|name.esm.js
esm|name.esm.min.js

### 发布

发布时，你只需自定义 `package.json` 的以下信息：

属性|说明
:-:|:-
`name`| 库的名称
`version`| 库的版本号，统一采用三位
`main`| cjs 版本打包后的文件名
`browser`| umd 版本打包后的文件名
`module`| esm 版本打包后的文件名
`homepage` | 库源码主页地址
`author`| 作者信息
`keywords`| 关键词
`files`| 使用时哪些文件夹会被下载
`license`| 协议

### 功能

#### Rollup

本初始模板已配置以下 rollup 功能：

插件名|来源|说明
:-:|:-:|:-
`rollup-plugin-cleaner`|社区|每次 build 前清除上一次的构建目录
`rollup-plugin-terser`|社区|采用 Terser 压缩 JavaScript
`rollup-plugin-postcss`|社区|采用 Postcss 处理 css
`@rollup/plugin-replace`|官方|自动替换文件中的环境变量
`@rollup/plugin-alias`|官方|提供在路径中使用别名的功能
`@rollup/plugin-node-resolve`|官方|提供打包引入库的功能
`@rollup/plugin-commonjs`|官方|提供将其他模块转换为 cjs 导入的功能

#### Babel

依赖名|说明
:-:|:-
`@babel/core`|Babel 核心依赖
`@babel/preset-env`|Babel 默认预设
`@babel/runtime`|Babel helper 辅助函数依赖
`@babel/runtime-corejs3`|Babel polyfill 填充库
`@babel/plugin-transform-runtime`|对 Babel 各依赖联动管理

#### CSS Preprocessor

依赖名|说明
:-:|:-
`autoprefixer`| 提供 CSS 前缀兼容的功能
`cssnano`| 提供 CSS 压缩、优化等功能
`cssnano-preset-default` | cssnano 默认预设
`node-sass`|提供 sass 编译能力

### 配置

文件名|说明
:-:|:-
`postcss.config.js`| Postcss 的配置文件，提供 autoprefixer 与 cssnano 的支持
`babel.config.json`| Babel 的配置文件，提供沙箱式 polyfill 
`.browserslistrc`| 指定浏览器兼容目标的版本信息

### 其他

实际使用中，你可能需要进一步深入配置 `rollup.config.js` ，比如打包的 `banner` 信息等。