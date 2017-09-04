/**
 * Types
 */
interface Props {
  rating: number;
}
/* *** */

import React from 'react';

const Rating = (props: Props): JSX.Element => {
  return (
    <div className="rating">
      <input type="radio" hidden={true} />
      <span className="star">&#9733;</span>
      <input type="radio" hidden={true} />
      <span className="star">&#9733;</span>
      <input type="radio" hidden={true} />
      <span className="star">&#9733;</span>
      <input type="radio" hidden={true} />
      <span className="star">&#9733;</span>
      <input type="radio" hidden={true} />
      <span className="star">&#9733;</span>
    </div>
  );
};

export default Rating;
