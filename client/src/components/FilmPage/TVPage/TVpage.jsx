import React, { useState, useEffect } from "react";
import "./TVPage.css";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserReviews from "../UserReviews/UserReviews";
import { Button, TextField } from "@mui/material";

const TVpage = () => {
    const { user } = useAuth0();
    const [abouttv, setabouttv] = useState();
    const [render, setRender] = useState(true);
  const [review, setReview] = useState("");
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

      const handleClick = async () => {
        if (review !== "") {
          await fetch(
            `${process.env.REACT_APP_DATABASE}/api/review/${abouttv.original_name}`
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
                    title: abouttv.original_name,
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
                    title: abouttv.original_name,
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

          {abouttv && (
            <div className="userrevs">
              <UserReviews
                key={render}
                render={render}
                name={abouttv ? abouttv.original_name : ""}
              />
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default TVpage
