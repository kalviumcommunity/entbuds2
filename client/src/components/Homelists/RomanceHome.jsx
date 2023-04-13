import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";

const RomanceHomeList = () => {
  const [romantichomemovie, setRomanticHomeMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.getromance).then((response) => {
        setRomanticHomeMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="categorYHeadings"> Romantic </h1>
          <div
            className="Linkpart"
          >
            <Link to= "movies/romance"><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {romantichomemovie.map((romantichomemovie, index) => {
              return (
                <div className="postcard">
                <img
                  key={index} className="Posterimage"
                  src={`https://image.tmdb.org/t/p/original${
                    romantichomemovie && romantichomemovie.poster_path
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

export default RomanceHomeList;
