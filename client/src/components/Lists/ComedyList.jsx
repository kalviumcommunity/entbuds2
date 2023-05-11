import React, { useState, useEffect } from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const ComedyList = () => {

    const [comedymovie, setComedyMovie] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`${wants.getcomedy}&page=${page}`)
            .then(response => {
                setComedyMovie(prevMovies => [...prevMovies, ...response.data.results])
            })
    }, [page]);


    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="listCard">
                {
                    comedymovie.map((movie, index) => (
                        <Cards key={index} movie={movie} />
                    ))
                }
            </div>
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
        </div>
    )
}

export default ComedyList
