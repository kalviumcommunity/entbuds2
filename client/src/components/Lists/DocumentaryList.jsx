import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const DocumentaryList = () => {

    const [documentary, setDocumentary] = useState([]);

    useEffect(() => {
        axios.get(wants.getdocumentaries)
        .then(response => {
            setDocumentary(response.data.results)
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
                    documentary.map((movie,index) => (
                        <Cards key={index} movie = {movie} />
                    ))
                }
            </div>
    </div>
  )
}

export default DocumentaryList
