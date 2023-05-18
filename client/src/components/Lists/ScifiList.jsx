import React, { useState, useEffect } from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';

const ScifiList = () => {

  const [scifimovie, setScifiMovie] = useState([]);
  const [page, setPage] = useState(1);


  useEffect(() => {
    axios.get(`${wants.getscifi}&page=${page}`)
      .then(response => {
        setScifiMovie(prevMovies => [...prevMovies, ...response.data.results])
      })
  }, [page]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="listCard">
        {
          scifimovie.map((movie, index) => (
            <Cards key={index} movie={movie} />
          ))
        }
      </div>
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
    </div>
  )
}

export default ScifiList
