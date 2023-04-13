import { useState, useEffect } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2100)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="card">
          <div className="skeleton" />
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="card">
            <img
              className="cards-img"
              alt={""}
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
            />
            <div className="card-overlay">
              <div className="card-title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card-runtime">
                {movie ? movie.release_date : ""}
                <span className="card-rating">{movie ? movie.vote_average : ""}</span>
              </div>
              <div className="card-desc">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
