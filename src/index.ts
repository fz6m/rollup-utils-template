import './style.scss'

const example = <T>(param: boolean, ...args: any[]): T => {
  const array: Array<T> = []
  return [...array][0]
}

export default example
