import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const TVpage = () => {
    const { user } = useAuth0();
    const [abouttv, setabouttv] = useState();
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(
            `${wants.gettvdetails}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          )
          .then((response) => {
            setabouttv(response.data);
          });
        window.scrollTo(0, 0);
      }, [id]);


  return (
    <div>
      <div className="introduction">
        <img
          className="bg"
          src={`https://image.tmdb.org/t/p/original${
            abouttv ? abouttv.backdrop_path : ""
          }`}
          alt="bgimg"
        />
      </div>

      <div className="thumbbox">
        <div className="thumbnail">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${
              abouttv ? abouttv.poster_path : ""
            }`}
            alt="poster"
          />
        </div>
        <div className="head-data">
          <div className="poster-name-rating text-styling">
            <h1>{abouttv ? abouttv.original_name : "Movie Title"}</h1>
            <h1>{abouttv ? abouttv.vote_average : "5 Star"}</h1>
          </div>
          <div className="date text-styling">
            <h1>
              Release date:{" "}
              <span
                style={{
                  color: "white",
                }}
              >
                {abouttv ? abouttv.first_air_date: "31st Feb"}
              </span>
            </h1>
          </div>
          <div className="description">
            <h1>Sypnosis: </h1>
            <p>{abouttv ? abouttv.overview : "Overview here"}</p>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default TVpage
