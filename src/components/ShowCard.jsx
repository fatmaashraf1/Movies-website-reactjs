import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ShowCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <Link to={`/details/${movie.id}`}>
        <img src={movie.image.medium} alt={movie.name} />
      </Link>
      <h3>{movie.name}</h3>
    </div>
  );
}

export default ShowCard;
