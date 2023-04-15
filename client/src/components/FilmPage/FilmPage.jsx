import React, { useState, useEffect } from "react";
import "./FilmPage.css";
import axios from "../../api/Axios";
import wants from "../../api/Wanted";
import { useParams } from "react-router-dom";

const FilmPage = () => {
  const [allabout, setallabout] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `${wants.getdetails}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        setallabout(response.data);
      });
  }, [id]);

  return (
    <div className="chosen">
      <div className="introduction">
        <img
          className="bg"
          src={`https://image.tmdb.org/t/p/original${
            allabout ? allabout.backdrop_path : ""
          }`}
          alt="bgimg"
        />
      </div>

      <div className="thumbbox">
        <div className="thumbnail">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${
              allabout ? allabout.poster_path : ""
            }`}
            alt="poster"
          />
        </div>
        <div className="head-data">
          <div className="poster-name-rating text-styling">
            <h1>{allabout ? allabout.original_title : "Movie Title"}</h1>
            <h1>{allabout ? allabout.vote_average : "5 Star"}</h1>
          </div>
          <div className="date text-styling">
            <h1>
              Release date:{" "}
              <span
                style={{
                  color: "white",
                }}
              >
                {allabout ? allabout.release_date : "31st Feb"}
              </span>
            </h1>
          </div>
          <div className="description">
            <h1>Sypnosis: </h1>
            <p>{allabout ? allabout.overview : "Overview here"}</p>
          </div>
          <div className="uselinks">
            <h1>Useful Links</h1>
            {allabout && allabout.homepage && (
              <a
              href = {allabout.homepage}
              target="ok"
              rel="refer"
              style={{textDecoration: "none"}}>
                <span className="homebutton"> Home</span>
              </a>
            )}
            {allabout && allabout.imdb_id && (
              <a
              href = {"https://www.imdb.com/title/" + allabout.imdb_id}
              target="ok"
              rel="refer"
              style={{textDecoration: "none"}}>
                <span className="imdbbutton"> IMDB</span>
              </a>
            )}

          </div>
          </div>
          </div>
          <div className="prodpart">
          <h1 className="productionheading"> Production Companies</h1>
          <div className="productions">
            {allabout && allabout.production_companies && 
            allabout.production_companies.map((company) => (
              company.logo_path && (
                <div className="companyimage">
                  <img className="companyname"
                  src={"https://image.tmdb.org/t/p/original" + company.logo_path}
                  alt="company" />
                </div>
              )
            ))}
          </div>
          </div>
    </div>
  );
};

export default FilmPage;
