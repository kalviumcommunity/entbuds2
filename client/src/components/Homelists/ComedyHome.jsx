import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";

const ComedyHomeList = () => {
  const [comedyhomemovie, setComedyHomeMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.getcomedy).then((response) => {
      setComedyHomeMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Comedy </h1>
          <div
            className="Linkpart"
          >
           <Link to= "movies/comedy" style={{textDecoration: "none"}}><h4>Show more</h4></Link>
          </div>
         
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {comedyhomemovie.map((comedyhomemovie, index) => {
              return (
                <Link
                to={`/movie/${comedyhomemovie.id}`}>
                <div className="postcard">
                <img
                  key={index} className="Posterimage"
                  src={`https://image.tmdb.org/t/p/original${
                    comedyhomemovie && comedyhomemovie.poster_path
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

export default ComedyHomeList;
