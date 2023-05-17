import React, { useState, useEffect } from "react";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import { useParams } from "react-router-dom";
import YTReviews from "../YTReviews/YTReviews";
import UserReviews from "../UserReviews/UserReviews";
import { Button, TextField } from "@mui/material";
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
            <h1>{abouttv ? abouttv.original_title : "Movie Title"}</h1>
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
                {abouttv ? abouttv.release_date : "31st Feb"}
              </span>
            </h1>
          </div>
          <div className="description">
            <h1>Sypnosis: </h1>
            <p>{abouttv ? abouttv.overview : "Overview here"}</p>
          </div>
          <div className="uselinks">
            
            <h1>Useful Links</h1>
            {abouttv && abouttv.homepage && (
              <a
                href={abouttv.homepage}
                target="ok"
                rel="refer"
                style={{ textDecoration: "none" }}
              >
                <span className="homebutton"> Home</span>
              </a>
            )}
            {abouttv && abouttv.imdb_id && (
              <a
                href={"https://www.imdb.com/title/" + abouttv.imdb_id}
                target="ok"
                rel="refer"
                style={{ textDecoration: "none" }}
              >
                <span className="imdbbutton"> IMDB</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="prodpart">
        <h1 className="productionheading"> Production Companies</h1>
        <div className="productions">
          {abouttv &&
            abouttv.production_companies &&
            abouttv.production_companies.map(
              (company) =>
                company.logo_path && (
                  <div className="companyimage">
                    <img
                      className="companyname"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                      alt="company"
                    />
                  </div>
                )
            )}
        </div>
      </div>
      
    </div>
  )
}

export default TVpage
