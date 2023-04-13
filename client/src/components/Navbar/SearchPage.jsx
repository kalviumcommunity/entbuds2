import React, {useState, useEffect} from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';

const SearchPage = () => {

    const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [showload, setshowload] = useState(false)

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
    if(results.length > 0){
        setshowload(true);
    }else{
        setshowload(false);
    }
  }, [results])

  const InputChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div>
        <br />
        <br />
        <br />

         <br />
         <br />
         <br />
      <input type="text" placeholder="Search for a movie" value={query} onChange={InputChange} />
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
