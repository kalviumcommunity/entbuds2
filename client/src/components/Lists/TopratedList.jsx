import React, {useState, useEffect} from 'react';
import './TopratedList.css'
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';

const TopratedList = () => {

    const [topmovie, setTopMovie] = useState([]);

    useEffect(() => {
        axios.get(wants.gettops)
        .then(response => {
            setTopMovie(response.data.results)
        })
    }, []);

  return (
    <div className='list'>
      <h2 className="listTitle">Top Rated</h2>
            <div className="listCard">
                {
                    topmovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
    </div>
  )
}

export default TopratedList
