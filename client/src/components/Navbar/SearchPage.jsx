import React, {useState, useEffect} from 'react';
import "./SearchPage.css";
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';
import ActionList from '../Lists/ActionList';

const SearchPage = () => { 

    const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]); 
  const [page, setPage] = useState(1); 
  const [showload, setshowload] = useState(false); 
  const [notblank, setnotblank] = useState(true); 


  useEffect(() =>{
    if(query){
        axios.get(`${wants.getsearch}&query=${query}&page=${page}`)
        .then(response => {
            setResults(prevMovies => [...prevMovies, ...response.data.results]);
        })
    } else{
        setResults([])
    }
  }, [query, page])

  useEffect(() => {
    if(results.length >= 4){
        setshowload(true);
    }else{
        setshowload(false);
    }
  }, [results])

  const InputChange = (e) => {
    setQuery(e.target.value);
    setnotblank(false)
    if(e.target.value){
      const match = results.find((movie) => 
      movie.title.toLowerCase() === e.target.value.toLowerCase()
      );
      if(match){
        setResults([match])
      } else{
        setResults([])
      }
    } else{
      setResults([]);
    }
  }

  return (
    <div>
        <br />
        <br />
        <br />

         <br />
         <br />
         <br />
      <input type="text"  className="searchbar" placeholder="  Search for a movie" value={query} onChange={InputChange} />
      {notblank && (
        <ActionList />
      )}
      <div className='searchresults'>
      {results.map((result, index) => (
        <Cards key={index} movie={result} />
      ))}
      </div>
      {showload && (<button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>)}
    </div>
  )
}

export default SearchPage
