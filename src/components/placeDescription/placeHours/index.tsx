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

  renderToggleButton(): JSX.Element {
    const expanded: boolean = this.state.expanded;
    const toggle: () => void = this.toggle;
    return (
      <button className="weekdays__toggle-btn" onClick={toggle}>
        {expanded ? 'Hide' : 'Show'}
      </button>
    );
  }

  render() {
    const hours: Hours = this.props.hours;
    const weekdays: string[] = hours.weekday_text;
    const expanded: boolean = this.state.expanded;
    console.log(hours);
  
    return (
      <div className="hours">
        <div className="hours__title">
          <i className="material-icons">phone</i>
          <h3>Hours</h3>
        </div>
        <div className="weekdays">
          <ul className={expanded ? 'active' : ''}>
            {
              weekdays.map((day: string, index: number) => (
                <li key={index}>{day}</li>
              ))
            }
          </ul>
          {this.renderToggleButton()}
        </div>
      </div>
    );
  }

  private toggle = (): void => {
    const expanded: boolean = this.state.expanded;

    this.setState({ expanded: !expanded });
  }
}

export default PlaceHours;
