import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";
import Cards from '../../Slide/Card';

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
            <Link to= "movies/horror" style={{textDecoration: "none", color: "white"}}><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {horrorhomemovie.map((horrorhomemovie, index) => {
              return (
                <Cards key={index} movie={horrorhomemovie} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorrorHomeList;
