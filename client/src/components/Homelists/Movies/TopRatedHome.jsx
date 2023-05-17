import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";
import Cards from '../../Slide/Card';

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
            <Link to="movies/toprated" style={{textDecoration: "none", color: "white"}}><h4>Show more</h4></Link>
          </div>
          {console.log(topratedmovie)}
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {topratedmovie.map((topratedmovie, index) => {
              return (
                <Cards key={index} movie={topratedmovie} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHomeList;
