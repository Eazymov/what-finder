import './style'

import React, { Component } from 'react'

import { OpeningHours } from 'Types'

interface Props {
  hours: OpeningHours
}

interface State {
  expanded: boolean
}

class PlaceHours extends Component<Props, State> {
  public state = {
    expanded: false
  }

  renderToggleButton(openNow: boolean): JSX.Element {
    const toggle: () => void = this.toggle
    const expanded: boolean = this.state.expanded
    const status: string = openNow ? 'open now' : 'closed now'
    const text: string = expanded ? 'Hide' :  status
    const className: string = expanded ? 'active' : ''

    return (
      <button
        className={`weekdays__toggle-btn ${className}`}
        onClick={toggle}
      >
        {text}
      </button>
    )
  }

  render(): JSX.Element {
    const hours: OpeningHours = this.props.hours
    const expanded: boolean = this.state.expanded
    const weekdays: string[] = this.sort(hours.weekday_text)
    const openNow: boolean = hours.open_now
  
    return (
      <div className="hours">
        <div className="hours__title">
          <i className="material-icons">access_time</i>
          <h3>Hours:</h3>
        </div>
        <div className="weekdays">
          <ul className={expanded ? 'active' : ''}>
            {
              weekdays.map((day: string, index: number) => (
                <li key={index}>{day}</li>
              ))
            }
          </ul>
          {this.renderToggleButton(openNow)}
        </div>
      </div>
    )
  }

  private sort(weekdays: string[]): string[] {
    const today: number = new Date().getDay() - 1
    const result = [
      ...weekdays.slice(today),
      ...weekdays.slice(0, today)
    ]

    return result
  }

  private toggle = (): void => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }
}

export default PlaceHours
