import './style.styl'

import React from 'react'

interface Props {
  show?: boolean
  width?: number
}

const LoaderComponent = ({ show, width = 100 }: Props) => {
  const display: string = !show ? 'none' : 'block'
  const style = { display, width }

  return (
    <div className="loader" style={style}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  )
}

export default LoaderComponent
