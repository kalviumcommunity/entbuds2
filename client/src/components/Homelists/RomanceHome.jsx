import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";
import Cards from '../Slide/Card';

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
          <h1 className="Heading"> Romantic </h1>
          <div
            className="Linkpart"
          >
            <Link to= "movies/romance" style={{textDecoration: "none", color: "white"}}><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {romantichomemovie.map((romantichomemovie, index) => {
              return (
                <Cards key={index} movie={romantichomemovie} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RomanceHomeList;
