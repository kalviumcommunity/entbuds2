import React, { useState, useEffect } from "react";
import "./FilmPage.css";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import { useParams } from "react-router-dom";
import YTReviews from "../YTReviews/YTReviews";
import UserReviews from "../UserReviews/UserReviews";
import { Button, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const FilmPage = () => {
  const { user } = useAuth0();
  const [allabout, setallabout] = useState();
  const [render, setRender] = useState(true);
  const [review, setReview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `${wants.getdetails}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        setallabout(response.data);
      });
    window.scrollTo(0, 0);
  }, [id]);


  const handleClick = async () => {
    if (review !== "") {
      await fetch(
        `${process.env.REACT_APP_DATABASE}/api/review/${allabout.original_title}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (!data.exist) {
            fetch(`${process.env.REACT_APP_DATABASE}/api/review`, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                title: allabout.original_title,
                reviews: {
                  review: review,
                  name: user.name,
                  image: user.picture,
                },
              }),
            })
              .then((resp) => {
                if (!resp.ok) {
                  throw new Error("Network response was not ok.");
                }
              })
              .then((data) => {
                console.log(data);
                setRender(!render);
                setReview("");
                // window.location.reload();
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            fetch(`${process.env.REACT_APP_DATABASE}/api/review`, {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                title: allabout.original_title,
                reviews: {
                  name: user.name,
                  review: review,
                  image: user.picture,
                },
              }),
            })
              .then((resp) => {
                if (!resp.ok) {
                  throw new Error("Network response was not ok.");
                } else {
                  resp.json();
                  setRender(!render);
                  setReview("");
                  // window.location.reload();
                }
              })
              .then((data) => {
                console.log(data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((error) => {
          console.error("There was a problem fetching the data:", error);
        });
    } else {
      alert("Please fill the field");
    }
  };

  return (
    <div className="chosen">
      <div className="introduction">
        <img
          className="bg"
          src={`https://image.tmdb.org/t/p/original${allabout ? allabout.backdrop_path : ""
            }`}
          alt="bgimg"
        />
      </div>

      <div className="thumbbox">
        <div className="thumbnail">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${allabout ? allabout.poster_path : ""
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
                href={allabout.homepage}
                target="ok"
                rel="refer"
                style={{ textDecoration: "none" }}
              >
                <span className="homebutton"> Home</span>
              </a>
            )}
            {allabout && allabout.imdb_id && (
              <a
                href={"https://www.imdb.com/title/" + allabout.imdb_id}
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
      {/* <div className="prodpart">
        <h1 className="productionheading"> Production Companies</h1>
        <div className="productions">
          {allabout &&
            allabout.production_companies &&
            allabout.production_companies.map(
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
      </div> */}

      {allabout && (
        <YTReviews
          title={allabout ? allabout.original_title : ""}
          className="ytrevs"
        />
      )}

      <br></br>
      <br></br>



      <br></br>
      <br></br>

      <div className="inputs">
        <div className="review-section">
          <h2 color="red">Reviews</h2>
          <div className="review-container">
            <TextField
              value={review}
              className="review"
              label="Type your review here"
              onChange={(e) => setReview(e.target.value)}
            />

            <Button
              onClick={handleClick}
              variant="contained"
              size="small"
              style={{
                fontSize: "1.2rem",
                background: "red",
                color: "black",
                display: "flex",
                alignItems: "center",
                height: "2.8em"
              }}
            >
              Post
            </Button>
          </div>

          {allabout && (
            <div className="userrevs">
              <UserReviews
                key={render}
                render={render}
                name={allabout ? allabout.original_title : ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
