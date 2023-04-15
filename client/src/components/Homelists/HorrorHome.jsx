import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";

const HorrorHomeList = () => {
  const [horrorhomemovie, setHorrorHomeMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.gethorror).then((response) => {
      setHorrorHomeMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Horror </h1>
          <div
            className="Linkpart"
          >
            <Link to= "movies/horror"><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {horrorhomemovie.map((horrorhomemovie, index) => {
              return (
                <Link
                to={`/movie/${horrorhomemovie.id}`}>
                <div className="postcard">
                <img
                  key={index} className="Posterimage"
                  src={`https://image.tmdb.org/t/p/original${
                    horrorhomemovie && horrorhomemovie.poster_path
                  }`}
                  alt="movies"
                />
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorrorHomeList;
