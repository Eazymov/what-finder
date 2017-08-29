/**
 * Types
 */
type Hours = google.maps.places.OpeningHours;
/* *** */

import React from 'react';

import './style.styl';

const PlaceHours = (hours: Hours) => {
  console.log(hours);
  const weekdays: string[] = hours.weekday_text;

  return (
    <div className="hours">
      <h3>Hours</h3>
      <div className="weekdays">
        {
          weekdays.map((weekday: string) => (
            <span className="weekday">{weekday}</span>
          ))
        }
      </div>
    </div>
  );
};

export default PlaceHours;
