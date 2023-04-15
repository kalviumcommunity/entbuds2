import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";

const TopHomeList = () => {
  const [topratedmovie, setTopratedMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.gettops).then((response) => {
      setTopratedMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Top Rated </h1>
          <div
            className="Linkpart"
          >
            <Link to="movies/toprated"><h4>Show more</h4></Link>
          </div>
          {console.log(topratedmovie)}
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {topratedmovie.map((topratedmovie, index) => {
              return (
                <Link
                to={`/movie/${topratedmovie.id}`}>
                <div className="postcard">
                <img
                  key={index} className="Posterimage"
                  src={`https://image.tmdb.org/t/p/original${
                    topratedmovie && topratedmovie.poster_path
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

export default TopHomeList;
