import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";

function ShowDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${id}?embed=cast`
        );
        setMovieDetails(response.data);
        setCast(response.data._embedded.cast);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  const renderStars = (averageRating) => {
    const maxStars = 10;
    const rating = Math.round(averageRating * 0.5);
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < rating) {
        stars.push(<span className="star filled-star"></span>);
      } else {
        stars.push(<span className="star"></span>);
      }
    }

    return stars;
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="movie-details">
          <div className="movie-img">
            <img src={movieDetails.image?.original} alt={movieDetails.name} />
          </div>
          <div className="movie-details-info">
            <h1>{movieDetails.name}</h1>
            <p
              className="summary"
              dangerouslySetInnerHTML={{ __html: movieDetails.summary }}
            ></p>
            <StarRating rating={movieDetails.rating?.average || 0} />
          </div>
          <div className="layout-details">
            {movieDetails.webChannel && (
              <p>
                <span className="bold">Web channel: </span>
                {movieDetails.webChannel.name}{" "}
              </p>
            )}
            {movieDetails.network && (
              <p>
                <span className="bold">Network: </span>
                {movieDetails.network.name} |{" "}
                {movieDetails.network.country.name}
              </p>
            )}
            {movieDetails.genres && (
              <p>
                <span className="bold">Genres: </span>{" "}
                {movieDetails.genres.map((genre, index) => (
                  <span key={index}>
                    {genre}
                    {index !== movieDetails.genres.length - 1 && " | "}
                  </span>
                ))}
              </p>
            )}

            {movieDetails.schedule && (
              <>
                <p>
                  <span>
                    <span className="bold">Schedule: </span>
                    {movieDetails.schedule.days}{" "}
                  </span>
                  {movieDetails.schedule.time && (
                    <span>at {movieDetails.schedule.time}</span>
                  )}
                  <span> | {movieDetails.averageRuntime} min</span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="movie-cast">
          <h1>Cast</h1>
          <div className="actors-circle">
            {cast.map((actor) => (
              <div className="actor">
                <img src={actor.person.image.medium} alt={actor.person.name} />
                <p key={actor.person.id}>{actor.person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDetails;
