import React, { useState, useEffect } from 'react';
import { Button, TextField } from "@mui/material";

const Book = () => {
  const [movieLinks, setMovieLinks] = useState([]);
  const [city, setCity] = useState("")

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_DATABASE}/api/movies/jalandhar`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const links = data.movies.map(movie => movie.bookingUrl);
  //       setMovieLinks(links);
  //     })
  //     .catch(error => {
  //       console.log('Error fetching movie data:', error);
  //     });
  // }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DATABASE}/api/movies/${city}`);
      const data = await response.json();
      const { movies } = data;
      setMovieLinks(movies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />

      <div>
      <TextField value={city} onChange={(e)=> setCity(e.target.value)} placeholder="Enter city" />
      <Button onClick={fetchMovies}>Fetch Movies</Button>
      </div>
      <br />
      <br />
      <br />

      {movieLinks.map((link, index) => (
        <div style={{display: "flexbox"}}>
        <a key={index} href={link.bookingUrl} target="_blank" rel="noopener noreferrer">
          <Button>Book Ticket</Button>
        </a>
        </div>
      ))}
      
    </div>
  )
}

export default Book
