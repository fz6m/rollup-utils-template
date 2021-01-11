import React from 'react'

// css module
import style from './style.module.scss'

// css file
import '@/style.less'

// jsx
export default (): JSX.Element => (
  <button className={style.module}>content</button>
)
