import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

function StarRating({ rating }) {
  const stars = [];
  for (let i = 0; i < 10; i++) {
    if (i < rating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="star-filled" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="star-empty" />
      );
    }
  }

  return <div className="star-rating">{stars} <span className="rating-text">{rating}</span></div>;
}

export default StarRating;
