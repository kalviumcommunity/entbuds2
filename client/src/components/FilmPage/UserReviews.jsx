import React, { useEffect, useState } from "react";
import "./UserReviews.css";

const UserReviews = (props) => {
  const { name } = props;
  const [CustReviews, setCustReviews] = useState([]);
  const styling = {
    color: "white",
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE}/api/review/${name}`)
    .then((response) => response.json())
      .then((data) => {
        if (data.exist) {
          setCustReviews(data.out.reviews);
          console.log(data.out.reviews);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [name]);
  return (
    <div style={styling}>
      {CustReviews.length > 0 &&
        CustReviews.map((review) => {
          return (
            <div className="letsrevw">
                <img src={review.image} className="ppic" alt="prof_pic" />
                <div className="textrev">
                <h3>{review.name}</h3>   
              <p key={review._id}>
                <i>"{review.review}"</i>
              </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserReviews;
