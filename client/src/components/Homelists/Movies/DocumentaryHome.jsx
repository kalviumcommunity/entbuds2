import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";
import Cards from '../../Slide/Card';

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
            <Link to= "movies/documentary" style={{textDecoration: "none", color: "white"}}><h4>Show more</h4></Link>
          </div>
          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {documhomemovie.map((documhomemovie, index) => {
              return (
                <Cards key={index} movie={documhomemovie} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocHomeList;
