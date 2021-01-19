<div align="center">

<img src = 'https://cdn.jsdelivr.net/gh/fz6m/Private-picgo@moe/img/20201122042521.jpg' width = '200px' />

# rollup-utils-template

![Rollop](https://img.shields.io/badge/rollop-2.3-ec4a3f)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Version](https://img.shields.io/badge/version-1.13-orange)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![License](https://img.shields.io/github/license/fz6m/rollup-utils-template)

使用 rollup 构建工具或功能库的起始模板，代码格式规范化，即开即用快速发布，节省初始配置构建环境的时间

*JavaScript* | *[TypeScript](https://github.com/fz6m/rollup-utils-template/tree/typescript)* | *[Components](https://github.com/fz6m/rollup-utils-template/tree/components)*

</div>


### 使用

在 `src/index.{js,jsx}` 入口处进行管理。

**开发**

```bash
  yarn dev
```

**构建**

```bash
  # 常规构建： css 会被抽取至 dist/css 下
  yarn build

  # 开发构建
  yarn build:dev

  # 内联构建： css 会被内联自动注入页面 <head>
  yarn build:inline
```

构建产物将生成至 `./dist` 下：

类型|文件名
:-:|:-:
cjs|name.cjs.js
cjs|name.cjs.min.js
umd|name.js
umd|name.min.js
esm|name.esm.js
esm|name.esm.min.js

### 发布

发布时，根据需要自定义 `package.json` 的以下信息：

属性|说明
:-:|:-
`name`| 库的名称
`version`| 库的版本号，统一采用三位
`author`| 作者信息
`description`| 仓库说明
`main`| cjs 版本打包后的文件名
`module`| esm 版本打包后的文件名
`umd:main`| umd 版本打包后的文件名
`unpkg`| unpkg cdn 默认加载文件
`jsdelivr` | jsdelivr cdn 默认加载文件
`homepage` | 库源码主页地址
`repository`| 仓库地址
`keywords`| 关键词
`files`| 使用时哪些文件夹会被下载
`license`| 协议

之后书写 `README.md` 文档，再执行自动化发布

```bash
  # 更新版本号 -> 构建产物 -> 生成 CHANGELOG -> 自动提交 -> 决定是否发布到 NPM
  yarn all
```

### 功能

本初始模板已集成以下功能：

功能|类型|说明
:-:|:-:|:-
`terser`|js|采用 terser 压缩 javascript
`jsx-runtime`|js|提供 jsx 语法使用支持
`node-sass`|css|支持使用 scss 语法
`less`|css|支持使用 less 语法
`postcss`|css|支持使用 css module
`postcss`|css|采用 postcss 处理 css
`autoprefixer`|css|提供 css 跨浏览器前缀兼容
`cssnano`|css|提供 css 压缩、优化功能
`alias`|build|支持在路径中采用 `@` 形式的别名
`cleaner`|build|每次 build 前清除上一次的构建目录
`replace`|build|支持自定义环境变量
`commonjs`|build|提供将其他模块统一转换为 `cjs` 导入的功能
`node-resolve`|build|对于 `cjs` 与 `umd` 提供打包第三方依赖功能
`json`|build|提供导入 json 文件功能


### 配置

文件名|说明
:-:|:-
`postcss.config.js`| postcss 的配置文件，提供 autoprefixer 与 cssnano 支持
`babel.config.js`| babel 配置文件
`commitlint.config.js`| git commit 提交规范
`.browserslistrc`| 指定浏览器兼容的目标版本
`jsconfig.json`| 工作区文件智能识别配置
`.editorconfig`| 工作区文件格式配置
`.eslintrc.js`| eslint 配置
`.eslintignore`| eslint 忽略配置
`.huskyrc.json`| git hooks 钩子配置
`.prettierrc`| 代码规范配置
`.stylelintrc.json`| css 规范配置
`rollup.config.js`| rollup 打包配置

### 规范化

功能|说明
:-:|:-
`commitlint`| git commit 信息规范化
`eslint` / `prettier`| 代码风格统一化
`stylelint`| css 格式规范化
`standard-version`| 版本号智能化
`lint-staged`| 缓冲区代码规范化
`conventional-changelog`| 变动日志规范化


### 其他

实际使用中，你可能需要进一步深入配置 `rollup.config.js` ，比如打包的 `banner` 信息等。

注：在开发库时不建议使用 `>=es6` 的高阶方法，因为 polyfill 会极大增大包的体积。