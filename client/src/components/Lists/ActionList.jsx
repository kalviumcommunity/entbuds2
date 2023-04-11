import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';

const ActionList = () => {

    const [actionmovie, setActionMovie] = useState([]);

    useEffect(() => {
        axios.get(wants.getaction)
        .then(response => {
            setActionMovie(response.data.results)
        })
    }, []);

  return (
    <div>
      <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
      <div className="listCard">
                {
                    actionmovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
    </div>
  )
}

export default ActionList
