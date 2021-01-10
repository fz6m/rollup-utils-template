/*

  -------------- 依赖收集 --------------
  自动查找所有的组件 chunk 并按 { [input]: fullPath } 格式输出

*/

const path = require('path')
const fs = require('fs')

const targetDirName = 'components'

const fullPath = path.join(__dirname, `../${targetDirName}`)

/**
 * 判断 src/{target} 是否文件夹
 */
const isDir = (dir) => {
  const stat = fs.lstatSync(`${fullPath}/${dir}`)
  return stat.isDirectory()
}

/**
 * 获取文件夹下 index 入口的 chunk 对象
 */
const getIndexChunkWithDir = (dir) => {
  const name = 'index.ts'
  const jsxName = 'index.tsx'

  const indexPath = `${fullPath}/${dir}/${name}`
  const indexJsxPath = `${fullPath}/${dir}/${jsxName}`

  const hasIndex = fs.existsSync(indexPath)
  const hasIndexJsx = fs.existsSync(indexJsxPath)

  const key = `${dir}/index`

  return hasIndex
    ? { [key]: indexPath }
    : hasIndexJsx
    ? { [key]: indexJsxPath }
    : null
}

/**
 * 判断文件是否为入口
 */
const getIndexChunkWithFile = (file) => {
  if (['index.ts', 'index.tsx'].includes(file)) {
    return { index: `${fullPath}/${file}` }
  }
  return null
}

const getInputChunk = () => {
  let out = {}

  const files = fs.readdirSync(fullPath)
  files.forEach((dir) => {
    const chunk = isDir(dir)
      ? getIndexChunkWithDir(dir)
      : getIndexChunkWithFile(dir)
    chunk && (out = { ...out, ...chunk })
  })

  return out
}

module.exports = {
  getInputChunk,
  isDir,
  fullPath
}
