/**
 * Types
 */
type Hours = google.maps.places.OpeningHours;

interface Props {
  hours: Hours;
}

interface State {
  expanded: boolean;
}
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.styl';

class PlaceHours extends Component<Props, State> {
  static PropTypes = {
    hours: PropTypes.array.isRequired
  };

  state = {
    expanded: false
  };

  constructor(props: Props) {
    super(props);
  }

  renderToggleButton(openNow: boolean): JSX.Element {
    const toggle: () => void = this.toggle;
    const expanded: boolean = this.state.expanded;
    const status: string = openNow ? 'open now' : 'closed now';
    const text: string = expanded ? 'Hide' :  status;
    const className: string = expanded ? 'active' : '';

    return (
      <button
        className={`weekdays__toggle-btn ${className}`}
        onClick={toggle}
      >
        {text}
      </button>
    );
  }

  render(): JSX.Element {
    const hours: Hours = this.props.hours;
    const expanded: boolean = this.state.expanded;
    const weekdays: string[] = this.sort(hours.weekday_text);
    const openNow: boolean = hours.open_now;
  
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
    );
  }

  private sort(weekdays: string[]): string[] {
    const today: number = (new Date()).getDay() - 1;
    const result = [
      ...weekdays.slice(today),
      ...weekdays.slice(0, today)
    ];

    return result;
  }

  private toggle = (): void => {
    const expanded: boolean = this.state.expanded;

    this.setState({ expanded: !expanded });
  }
}

export default PlaceHours;
