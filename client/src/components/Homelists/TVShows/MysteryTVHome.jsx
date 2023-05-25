import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import "./CatHome.css";
import { Link } from "react-router-dom";
import TVCards from "../../Slide/TVCard";

const MysteryTVHome = () => {
    const [mysterytvhome, setmysterytvhome] = useState([]);
    
    useEffect(() => {
        axios.get(wants.getmysterytv).then((response) => {
            setmysterytvhome(response.data.results);
        });
    }, []);


  return (
    <>
      <div className="Container">
        <div className="Containertop">
          <h1 className="Heading"> Mystery </h1>

          
        </div>
        <div className="Containerbottom">
          <div className="mainthing">
            {mysterytvhome.map((actiontvshow, index) => {
              return (
                <TVCards key={index} movie={actiontvshow} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default MysteryTVHome
