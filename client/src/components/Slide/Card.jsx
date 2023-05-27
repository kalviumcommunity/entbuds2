import { useState, useEffect } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuth0 } from "@auth0/auth0-react";

const Cards = ({ movie, onRemove }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liked , setLiked] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2100)
  }, [])

  useEffect(() => {
    setLiked(false); // Reset isLiked state when component re-renders
    if (movie && isAuthenticated) {
      // Check if the movie is in the liked movie list
      fetch(`${process.env.REACT_APP_DATABASE}/api/likedmovie/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "Success") {
            const likedMovies = data.movies;
            const isLikedMovie = likedMovies.some(
              (likedMovie) => likedMovie.id === movie.id
            );
            setLiked(isLikedMovie);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setIsLoading(false);
  }, [movie, user, isAuthenticated]);

  const addToLiked = async (event) => {
    try {
      event.preventDefault();
      setLiked(true);
      const liker = await fetch(`${process.env.REACT_APP_DATABASE}/api/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          data: movie
        })
      });
  
      if (!liker.ok) {
        throw new Error(`HTTP error! status: ${liker.status}`);
      }
  
      const likerData = await liker.json();
      console.log(likerData);
  
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFromLiked = async (event) => {
    try {
      event.preventDefault();
      setLiked(false)
      const deleter = await fetch(`${process.env.REACT_APP_DATABASE}/api/delete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          filmId: movie.id
        })
      });
  
      if (!deleter.ok) {
        throw new Error(`HTTP error! status: ${deleter.status}`);
      }
  
      const deleterData = await deleter.json();
      console.log(deleterData);

      onRemove(movie.id)
  
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <>
      {isLoading ? (
        <div className="card">
          <div className="skeleton" />
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}` || `/series/${movie.id}`}
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
            {isAuthenticated && (
            <div className='btnlike'>
          {!liked ? (
          <Button style={{
                fontSize: "1.2rem",
                background: " rgba(0, 0, 0, 0.7)",
                width: "100%",   
                bottom: "1",        
                color: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }} onClick={addToLiked}><FavoriteBorderIcon width='100%' fontSize="medium"  /></Button>
              ) : (
                <Button style={{
                  fontSize: "1.2rem",
                  background: " rgba(0, 0, 0, 0.7)",
                  width: "100%",           
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }} onClick={deleteFromLiked}><DeleteOutlineOutlinedIcon width='100%' fontSize="medium" /></Button>
              )}
        
          </div>
              )}
            
            <div className="card-overlay">
              
              <div className="card-title">
                {movie ? (movie.original_title || movie.original_name) : ""}
              </div>
              <div className="card-runtime">
                {movie ? movie.release_date : ""}
                <span className="card-rating">{movie ? movie.vote_average : ""}</span>
              </div>
              <div className="card-desc">
                {movie ? movie.overview && movie.overview.slice(0, 118) + "..." : ""}
              </div>
              
            </div>
            
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
