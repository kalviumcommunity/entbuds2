import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const RomanceList = () => {

    const [romanticmovie, setRomanticMovie] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`${wants.getromance}&page=${page}`)
        .then(response => {
            setRomanticMovie(prevMovies => [...prevMovies, ...response.data.results])
        })
    }, [page]);

  return (
    
    <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
      <div className="listCard">
                {
                    romanticmovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
    </div>
  )
}

export default RomanceList
