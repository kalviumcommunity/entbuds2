import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const HorrorList = () => {

    const [horrormovie, setHorrorMovie] = useState([]);

    useEffect(() => {
        axios.get(wants.gethorror)
        .then(response => {
            setHorrorMovie(response.data.results)
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
                    horrormovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
    </div>
  )
}

export default HorrorList
