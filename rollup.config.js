import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'

// https://github.com/saf33r/rollup-plugin-cleaner
import cleaner from 'rollup-plugin-cleaner'

// https://github.com/egoist/rollup-plugin-postcss
import postcss from 'rollup-plugin-postcss'

// https://github.com/ezolenko/rollup-plugin-typescript2
import typescript from 'rollup-plugin-typescript2'

// support .js .jsx
import { DEFAULT_EXTENSIONS } from '@babel/core'

const path = require('path')

const out = [
  {
    dir: 'lib',
    format: 'cjs'
  },
  {
    dir: 'es',
    format: 'esm'
  }
]

const { getInputChunk } = require('./scripts/dependent-collect')
const chunks = Object.entries(getInputChunk())
let isClear = false

const configGenerator = (chunk) => {
  return out.map((format) => {
    let cleanPlugin = null
    if (!isClear) {
      isClear = true
      cleanPlugin = cleaner({
        targets: ['./dist', './lib', './es', './types']
      })
    }
    const targetDir = format.format === 'esm' ? 'es' : 'lib'
    const css =
      chunk[0].slice(0, chunk[0].length - 'index'.length) + 'style/index.css'
    console.log(css)
    return {
      input: { [chunk[0]]: chunk[1] },
      output: format,
      plugins: [
        cleanPlugin,
        image(),
        json(),
        commonjs(),
        alias({
          entries: [{ find: '@', replacement: resolve('src') }]
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        typescript({
          check: true,
          tsconfig: resolve('tsconfig.json'),
          useTsconfigDeclarationDir: true
        }),
        babel({
          exclude: 'node_modules/**',
          extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
        }),
        postcss({
          extract: resolve(`${targetDir}/${css}`)
        })
      ].filter(Boolean)
    }
  })
}

export default chunks.map((chunk, i) => configGenerator(chunk, i)).flat()

/**
 * 获取文件绝对路径
 * @param {String} dir 文件相对路径
 */
function resolve(dir) {
  return path.join(__dirname, dir)
}
