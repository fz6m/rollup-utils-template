import React from 'react'
import './style/index.scss'

export default ({ width = '10px' }) => {
  return (
    <button type="button" className="button" style={{ width }}>
      test
    </button>
  )
}
