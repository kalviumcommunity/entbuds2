import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const ComedyList = () => {

    const [comedymovie, setComedyMovie] = useState([]);

    useEffect(() => {
        axios.get(wants.getcomedy)
        .then(response => {
            setComedyMovie(response.data.results)
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
                    comedymovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
    </div>
  )
}

export default ComedyList
