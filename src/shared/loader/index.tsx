import React, { Component } from 'react';

interface Style {
  [key: string]: string | number;
}

interface Props {
  show?: boolean;
  width?: number;
}

class LoaderComponent extends Component<Props, {}> {
  constructor (props: Props) {
    super(props);
  }

  render () {
    const { show, width = 100 } = this.props;
    const display: string = (show === false) ? 'none' : 'block';
    const style: Style = { display, width };

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
    );
  }
}

export default LoaderComponent;
