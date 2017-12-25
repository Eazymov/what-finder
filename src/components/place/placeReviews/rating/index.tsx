import './style'

import React, { Component } from 'react'

interface Props {
  rating: number
  disabled?: boolean
  size?: number
}

interface State {
  value: number
}

class Rating extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      value: Math.round(props.rating) || 0
    }
  }

  public render(): JSX.Element {
    const size: string = `${this.props.size || 16}px`
    const disabled: boolean = Boolean(this.props.disabled)
    const pointerEvents: string = disabled ? 'none' : 'auto'
    const value: number = this.state.value
  
    return (
      <div className="rating" style={{ pointerEvents }}>
        {
          [5, 4, 3, 2, 1].map((key: number) => {
            const className: string = (value === key) ? 'active' : ''
            
            return (
              <span
                key={key}
                style={{
                  fontSize: size,
                  lineHeight: size,
                }}
                className={`star ${className}`}
                onClick={() => this.setState({
                  value: key
                })}
              />
            )
          })
        }
      </div>
    )
  }
}

export default Rating
