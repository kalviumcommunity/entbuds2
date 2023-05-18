import React, { useState, useEffect } from "react";
import "./FilmPage.css";
import axios from "../../../api/Axios";
import wants from "../../../api/Wanted";
import { useParams } from "react-router-dom";
import YTReviews from "../YTReviews/YTReviews";
import UserReviews from "../UserReviews/UserReviews";
import { Button, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

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
    <div className="chosen" style={{ display: "flex", flexDirection:"column" }}>
      <div className="introduction">
        <img className="bg" src={`https://image.tmdb.org/t/p/original${ allabout ? allabout.backdrop_path : "" }`} style={{ width: "100%", borderRadius:"20px"}} alt="bgimg" />
      </div>

      <div className="thumbbox" style={{display:"flex", flexDirection:"column", width:"100%"}}>

        <div className="head-data" style={{width:"100%", display:"flex", flexDirection:"row"}}>
          
          <div className="thumbnail" style={{width:"30%"}}>
            <img className="poster" src={`https://image.tmdb.org/t/p/original${ allabout ? allabout.poster_path : "" }`} style={{ width: "70%", marginTop:"-15%", borderRadius:"20px" }} alt="poster"/>
          </div>

          <div className="head-data-content" style={{width:"70%", display:"flex", flexDirection:"column"}}>

            <div className="poster-name-rating-text-styling" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"0vh 2vh 0vh 0vh"}}>
              <h1 style={{color:"white"}}>{allabout ? allabout.original_title : "Movie Title"}</h1>
              <h1 style={{color:"white"}}>{allabout ? allabout.vote_average : "5 Star"}</h1>
            </div>

            <div className="date-text-styling">
              <h2 style={{color:"red", textAlign:"left", marginTop:"0vh"}}>Release date:{" "}<span style={{ color: "white" }}>{allabout ? allabout.release_date : "31st Feb"}</span></h2>
            </div>

            <div className="description">
              <h1 className="decription-h1" style={{color:"red", textAlign:"left"}}>Sypnosis</h1>
              <p className="decription-p" style={{color:"white", width:"80%", textAlign:"justify"}}>{allabout ? allabout.overview : "Overview here"}</p>
            </div>

          </div>
        </div>
          
        <div className="uselinks" style={{width:"60%", display:"flex", flexDirection:"row", alignItems:"center", padding:"0vh 0vh 0vh 8vh"}}>
          
          <h1 className="uselinks-h1" style={{color:"red", textAlign:"left"}}>Useful Links :</h1>
          <div className="uselinks-div" style={{width:"50%", padding:"8vh", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
            {allabout && allabout.homepage && (
              <Link to={allabout.homepage} style={{ textDecoration: "none", color:"white" }}>Home</Link>
            )}
            {allabout && allabout.imdb_id && (
              <Link to={"https://www.imdb.com/title/" + allabout.imdb_id } style={{ textDecoration: "none", color:"white" }}>IMDB</Link>
            )}
          </div>
        </div>

        <div className="prodpart" style={{width:"100%", padding:"0vh 0vh 0vh 8vh", display:"flex", flexDirection:"row", alignItems:"center"}}>
          
          <h1 className="productionheading" style={{width:"40%", color:"red", textAlign:"left"}}> Production Companies :</h1>
          <div className="productions" style={{width:"60%"}}>
            
            {allabout && allabout.production_companies && allabout.production_companies.map( (company) => company.logo_path && (
              <div className="companyimage">
                <img className="companyname" src={ "https://image.tmdb.org/t/p/original" + company.logo_path } style={{width:"50%"}} alt="company"/>
              </div>
            ))}
          </div>
        </div>
      </div>
      {allabout && (
        <YTReviews style={{height:"40vh"}} title={allabout ? allabout.original_title : ""} className="ytrevs" />
      )}
      <div className="inputs">
       
        <div className="review-section" style={{width:"100%", marginTop:"5vh"}}>
          
          <h1 style={{ color: "red", textAlign:"left", padding:"0% 0% 0% 2%", fontSize:"xx-large" }}>Reviews</h1>
          
          {allabout && (
            <div className="userrevs" style={{backgroundColor:""}}>
              <UserReviews key={render} render={render} name={allabout ? allabout.original_title : ""} />
            </div>
          )}

          <form className="review-container" style={{ width:"70%", backgroundColor:"transparent", padding:"2%"}} >
            <input className="review" style={{width:"50%"}} type="email" id="mail" placeholder="Type your review here" onChange={(e) => setReview(e.target.value)}/>
            <button className="review-save" onClick={handleClick} variant="contained" size="small" >Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
