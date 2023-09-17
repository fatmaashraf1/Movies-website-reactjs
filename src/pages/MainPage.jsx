import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowCard from "../components/ShowCard";
import Navbar from "../components/Navbar";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const moviesPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        const movies = response.data.slice(0, 80); 
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="show-title">Shows</h3>
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <ShowCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
          {Array.from(
            { length: Math.ceil(movies.length / moviesPerPage) },
            (_, i) => (
              <span
                key={i}
                className={`page-number ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </span>
            )
          )}
        </div>
      </div>
      
    </>
  );
}

export default MainPage;
