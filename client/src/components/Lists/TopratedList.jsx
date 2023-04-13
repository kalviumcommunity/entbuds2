import React, {useState, useEffect} from 'react';
import './TopratedList.css';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';

const TopratedList = () => {

    const [topmovie, setTopMovie] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`${wants.gettops}&page=${page}`)
        .then(response => {
            setTopMovie(prevMovies => [...prevMovies, ...response.data.results])
        })
    }, [page]);

  return (
    <div >
      <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
            <div className="listCard">
                {
                    topmovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
    </div>
  )
}

export default TopratedList
