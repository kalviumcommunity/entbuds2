import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";

const DocHomeList = () => {
  const [documhomemovie, setDocuHomeMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.getdocumentaries).then((response) => {
      setDocuHomeMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Documentaries </h1>
          <div
            className="Linkpart"
          >
            <Link to= "movies/documentary"><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {documhomemovie.map((documhomemovie, index) => {
              return (
                <div className="postcard">
                <img
                  key={index} className="Posterimage"
                  src={`https://image.tmdb.org/t/p/original${
                    documhomemovie && documhomemovie.poster_path
                  }`}
                  alt="movies"
                />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocHomeList;
