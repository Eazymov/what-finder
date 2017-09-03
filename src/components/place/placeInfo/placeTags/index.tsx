/**
 * Types
 */
interface Props {
  tags: string[];
}
/* *** */

import React from 'react';

const PlaceTags = (props: Props): JSX.Element => {
  const tags: string[] = props.tags;

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
};

export default PlaceTags;
