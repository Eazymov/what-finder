/**
 * Types
 */
interface Props {
  tags: string[];
}
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.styl';

class PlaceTags extends Component<Props, {}> {
  static propTypes = {
    tags: PropTypes.array.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const tags: string[] = this.props.tags;

    return (
      <div className="tags">
        {
          tags.map((tag: string, index: number) => (
            <a
              key={index}
              href=""
              className="tags__tag"
            >
              {tag.replace(/_/g, ' ')}
            </a>
          ))
        }
      </div>
    );
  }
}

export default PlaceTags;
