# rollup-utils-template-components

一个用 rollup 构建 工具或功能库 的起始模板，节省初始配置构建环境的时间。

*version: [JavaScript](https://github.com/fz6m/rollup-utils-template)*

*version: [TypeScript](https://github.com/fz6m/rollup-utils-template/tree/typescript)* 

*version: Components*

#### 本分支构建与 TypeScript 分支的不同

1. 最终产物将自动整理得到 `lib (cjs)` 和 `es (esm)` 两个文件夹中，支持 `babel-import-plugin` 按需导入 ：

    ```json
    // babel.config.json
    {
      "plugins": [
        ["import", {  "libraryName": "package-name", "style": true }]
      ]
    }
      ```

2. 可使用 `package-name/(lib|es)/default.js` 进行全量导入：

    ```js
      import { ComponentName } from 'package-name/lib/default.js'
      import 'package-name/lib/style/index.css'
    ```

#### 使用图像

默认会采用 base64 内联机制，如有大程度需求，请使用 `tsc` 单独打包你的图像库。