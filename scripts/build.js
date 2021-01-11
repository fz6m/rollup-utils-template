/*

  -------------- 构建脚本 --------------
  自动生成 esm / cjs 产物，并对产物做整齐化

  -------------- 处理流程 --------------
  1. production 环境 build
  2. 将 .d.ts 产物移至 lib / es 文件夹内
  3. 统一化 esm 格式产出与 .d.ts 文件
  4. 生成 cjs 格式 index.js 入口与 style/index.js 适配 babel-import-plugin 按需导入

*/
const execa = require('execa')
const fsp = require('fs-extra')
const stdio = { stdio: 'inherit' }
const { isDir, fullPath } = require('./dependent-collect')

const build = async () => {
  await execa('yarn', ['build:process'], stdio)

  fsp.copySync('./types/components', './lib')
  fsp.copySync('./types/components', './es')

  fsp.removeSync('./types')

  generateEsmIndex()

  generateCjxIndex()
}

build()

function generateEsmIndex() {
  // rename
  fsp.renameSync('./es/index.js', './es/default.js')
  // copy
  fsp.copySync('./es/index.d.ts', './es/index.js')
}

function generateCjxIndex() {
  // rename
  fsp.renameSync('./lib/index.js', './lib/default.js')
  // copy
  fsp.copySync('./es/index.d.ts', './lib/index.d.ts')
  // index.js template`
  const template = {
    header: `"use strict";`,
    polyfill: `
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
`,
    esModule: `
Object.defineProperty(exports, "__esModule", {
  value: true
});
`,
    bind: `
Object.defineProperty(exports, "<name>", {
  enumerable: true,
  get: function get() {
    return _<name>["default"];
  }
});
`,
    require: `var _<name> = _interopRequireDefault(require("./<name>"));`,
    footer: `
var ENV = process.env.NODE_ENV;

if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
  console.warn('You are using a whole package, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}
`
  }
  // dependent
  const dirs = fsp.readdirSync(fullPath).filter((d) => isDir(d))
  // binds, require
  let binds = ''
  let requires = ''
  dirs.forEach((d) => {
    binds += template.bind.replace(/<name>/g, d)
    requires += template.require.replace(/<name>/g, d)
    // generate style/index.js
    generateStyleIndex(d)
  })
  // out
  let out = template.header
  out += template.polyfill
  out += template.esModule
  out += binds
  out += requires
  out += template.footer
  fsp.writeFileSync('./lib/index.js', out)
}

function generateStyleIndex(d) {
  const content = "import './index.css';"
  const stylePath = {
    lib: `./lib/${d}/style`,
    es: `./es/${d}/style`
  }
  const hasStyle = {
    lib: fsp.existsSync(stylePath.lib),
    es: fsp.existsSync(stylePath.es)
  }
  hasStyle.lib && fsp.writeFileSync(`${stylePath.lib}/index.js`, content)
  hasStyle.es && fsp.writeFileSync(`${stylePath.es}/index.js`, content)
}
