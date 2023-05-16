import React, { useState, useEffect } from "react";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import "./TopRatedHome.css";
import { Link } from "react-router-dom";
import Cards from '../Slide/Card';

const ActionHomeList = () => {
  const [actionhomemovie, setActionHomeMovie] = useState([]);

  useEffect(() => {
    axios.get(wants.getaction).then((response) => {
      setActionHomeMovie(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Action </h1>
          <div
            className="Linkpart"
          >
            <Link to= "movies/action" style={{textDecoration: "none", color: "white"}}><h4>Show more</h4></Link>
          </div>
          {console.log(actionhomemovie)}
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {actionhomemovie.map((actionhomemovie, index) => {
              return (
                <Cards key={index} movie={actionhomemovie} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionHomeList;
