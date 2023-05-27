import React, { useState } from 'react';
import { Button } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './Book.css';
import imagenot from './nopost.png'

const Book = () => {
  const [moviebooks, setMoviebooks] = useState([]);
  
  const [city, setCity] = useState("")

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_DATABASE}/api/movies/jalandhar`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const links = data.movies.map(movie => movie.bookingUrl);
  //       setMoviebooks(links);
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
      setMoviebooks(movies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <div style={{minHeight: "90vh"}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /><br />


      <div className='ticketsearcher'>
      <input type='text' className='ticketsearch' value={city} onChange={(e)=> setCity(e.target.value)} placeholder="  Enter city"  style={{ color: 'white', fontSize: '12px', paddingLeft: "1em" }} />
      <Button style={{
                fontSize: "1rem",
                width: "9vw",
                background: "red",         
                color: "white",                
                textDecoration: "none"
              }} onClick={fetchMovies}>Let's Go</Button>
      </div>
      <br />
      <br />
      <br />

      {moviebooks.map((link, index) => (
        <div className='bookcard'>
          
          <img className='book-img' src={link.posterUrl || imagenot} alt='poster'></img>
          <div className='bookbtn'>
          <a key={index} href={link.bookingUrl} target="_blank" rel="noopener noreferrer">
          <Button style={{
                fontSize: "1.2rem",
                background: " rgba(0, 0, 0, 0.7)",
                width: "14vw",           
                color: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}><ArrowRightAltIcon fontSize='large'  /></Button>
        </a>
          </div>
          <div className='book-overlay'>
          <div className="book-title">
            <h2>{link.title}</h2>
            </div>
           
          </div>
        
        </div>
      ))}
      
    </div>
  )
}

export default Book
