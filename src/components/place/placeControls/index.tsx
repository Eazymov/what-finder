/**
 * Types
 */
interface Props {
  activePage: string;
  changePage: () => void;
}
/* *** */

import React from 'react';

const PlaceReviews = (props: Props): JSX.Element => {
  const activePage: string = props.activePage;
  const changePage: () => void = props.changePage;

  return (
    <div className="controls" onClick={changePage}>
      <button
        className={`
          material-icons
          controls__show-comments-btn
          ${activePage === 'comments' ? '' : 'active'}
        `}
      >
        comment
      </button> 
      <button
        className={`
          material-icons
          controls__show-info-btn
          ${activePage === 'info' ? '' : 'active'}
        `}
      >
        info_outline
      </button> 
    </div>
  );
};

export default PlaceReviews;
