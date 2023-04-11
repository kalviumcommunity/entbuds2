import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const RomanceList = () => {

    const [romanticmovie, setRomanticMovie] = useState([]);

    useEffect(() => {
        axios.get(wants.getromance)
        .then(response => {
            setRomanticMovie(response.data.results)
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
                    romanticmovie.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
    </div>
  )
}

export default RomanceList
