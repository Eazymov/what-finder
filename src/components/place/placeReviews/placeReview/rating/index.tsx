/**
 * Types
 */
interface Props {
  rating: number;
  disabled: boolean;
  size?: number;
}

interface State {
  value: number;
}
/* *** */

import React, { Component } from 'react';

class Rating extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.rating || 0
    };
  }

  public render(): JSX.Element {
    const disabled: boolean = this.props.disabled;
    const pointerEvents: string = disabled ? 'none' : 'auto';
    const value: number = this.state.value;
  
    return (
      <div className="rating" style={{ pointerEvents }}>
        {
          [5, 4, 3, 2, 1].map((key: number) => {
            const className: string = (value === key) ? 'active' : '';
            
            return (
              <span
                key={key}
                className={`star ${className}`}
                onClick={() => this.setState({
                  value: key
                })}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Rating;
