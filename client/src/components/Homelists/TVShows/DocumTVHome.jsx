import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import "./CatHome.css";
import { Link } from "react-router-dom";
import Cards from '../../Slide/Card';

const DocumentaryTVHome = () => {
    const [documtvhome, setdocumtvhome] = useState([]);
    
    useEffect(() => {
        axios.get(wants.getdocumtv).then((response) => {
            setdocumtvhome(response.data.results);
        });
    }, []);


  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Documentary </h1>

          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {documtvhome.map((actiontvshow, index) => {
              return (
                <Cards key={index} movie={actiontvshow} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentaryTVHome
