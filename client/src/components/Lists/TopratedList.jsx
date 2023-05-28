import React, {useState, useEffect} from 'react';
import './TopratedList.css';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';
// import BounceLoader from "react-spinners/BounceLoader";
import loading from '../Loader.svg'

const TopratedList = () => {

    const [topmovie, setTopMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);

    // useEffect(() => {
    //   setLoader(true)
    //     axios.get(`${wants.gettops}&page=${page}`)
    //     .then(response => {
    //         setTopMovie(prevMovies => [...prevMovies, ...response.data.results])
    //     })
    //     setLoader(false)
    // }, [page]);

    useEffect(() => {
      const fetchData = async () => {
        setLoader(true);
        try {
          const response = await axios.get(`${wants.gettops}&page=${page}`);
          setTopMovie(prevMovies => [...prevMovies, ...response.data.results]);
        } catch (error) {
          // Handle error if necessary
        }
        setLoader(false);
      };
    
      fetchData();
    }, [page]);
    

    if(loader)
return <div className='loadingpage' >
< img src={loading} alt='loading' style={{width: '10rem'}}/>

</div>

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
