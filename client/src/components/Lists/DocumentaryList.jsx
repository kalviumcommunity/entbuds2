import React, { useState, useEffect } from 'react';
import axios from '../../api/Axios';
import wants from '../../api/Wanted';
import Cards from '../Slide/Card';


const DocumentaryList = () => {

    const [documentary, setDocumentary] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`${wants.getdocumentaries}&page=${page}`)
            .then(response => {
                setDocumentary(prevMovies => [...prevMovies, ...response.data.results])
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
                    documentary.map((movie, index) => (
                        <Cards key={index} movie={movie} />
                    ))
                }
            </div>
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
        </div>
    )
}

export default DocumentaryList
