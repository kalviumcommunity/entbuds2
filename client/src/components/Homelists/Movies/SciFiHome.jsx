import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";
import Cards from '../../Slide/Card';

const SciFiHomeList = () => {
  const [scifihomemovie, setScifiHomeMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.getscifi).then((response) => {
      setScifiHomeMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Sci-Fi </h1>
          <div
            className="Linkpart"
          >
            <Link to= "movies/scifi" style={{textDecoration: "none", color: "white"}}><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {scifihomemovie.map((scifihomemovie, index) => {
              return (
                <Cards key={index} movie={scifihomemovie} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SciFiHomeList;
