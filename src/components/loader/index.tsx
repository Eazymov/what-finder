import * as React from 'react';
import { Component } from 'react';

import './style.styl';

interface Props {
  show: boolean;
}

class LoaderComponent extends Component<Props, {}> {
  constructor (props: Props) {
    super(props);
  }

  render () {
    const display = this.props.show ? 'block' : 'none';

    return (
      <div className="loader" style={{ display }}>
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
    );
  }
}

export default LoaderComponent;
