import React, { useEffect, useState } from "react";
import "./UserReviews.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, TextField, ToggleButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const UserReviews = (props) => {
  const { user } = useAuth0();
  const { name } = props;
  const { username } = props;
  const [CustReviews, setCustReviews] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [showreply, handleshowreply] = useState(false);
  const [editText, setEditText] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  const styling = {
    color: "white",
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATABASE}/api/review/${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.exist) {
          setCustReviews(data.out.reviews);
          console.log(data.out);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [name]);

  const handleShowEditForm = (text) => {
    setEditText(text);
    setShowEditForm(true);
  };

  const handleEditReview = async (e, review) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE}/api/review/edit/${name}/${review._id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            text: editText,
          }),
        }
      );
      if (response.ok) {
        const updatedReview = await response.json();
        const updatedReviews = CustReviews.map((r) =>
          r._id === updatedReview._id ? updatedReview : r
        );
        setCustReviews(updatedReviews);
        setShowEditForm(false);
        console.log("Review updated");
      } else {
        console.log("Review update failed");
      }
    } catch (e) {
      console.log(e);
    }
  };


  const handleDeleteReview = async (e, review) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE}/api/review/${name}/${review._id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: username,
          }),
        }
      );

      if (response.ok) {
        const updatedReviews = CustReviews.filter(
          (reviews) => reviews._id !== review._id
        );
        setCustReviews(updatedReviews);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLikeReview = async (e, review) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE}/api/review/like/${name}/${review._id}/${user.email}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
        }
      );
      if (response.ok) {
        const updatedReview = await response.json(); // get the updated review object from response
        const updatedReviews = CustReviews.map((r) => {
          if (r._id === updatedReview._id) {
            return updatedReview;
          } else {
            return r;
          }
        });
        setCustReviews(updatedReviews);
        console.log("Like Updated");
      } else {
        console.log("Like Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleReplyReview = async (e, review) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE}/api/review/reply/${name}/${review._id}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            text: replyText,
            user: user.name,
            userimage: user.image,
          }),
        }
      );
      if (response.ok) {
        const updatedReview = await response.json(); // get the reply object from response
        const updatedReviews = CustReviews.map((r) => {
          if (r._id === review._id) {
            const updatedReplies = [...r.replies, updatedReview];
            return { ...r, replies: updatedReplies };
          } else {
            return r;
          }
        });
        setCustReviews(updatedReviews);
        console.log("Reply Added");
      } else {
        console.log("Reply Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={styling}>
      {CustReviews.length > 0 &&
        CustReviews.map((review) => {
          return (
            <div className="letsrevw">
              <img src={review.image} className="ppic" alt="prof_pic" />
              <div className="textrev">
                <div className="mainrev">
                  <h3>{review.name}</h3>
                  <p key={review._id}>
                    <i>"{review.review}"</i>
                  </p>


                  {showEditForm && (
                    <form onSubmit={(e) => handleEditReview(e, review)}>
                      <input
                        type="text"
                        placeholder="Edit Review"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button type="submit">Save</button>
                    </form>
                  )}

                  {showreply && (
                    <div className="replysection">
                      {review.replies && (
                        <div className="replies">
                          {review.replies.map((reply) => (
                            <div className="reply" key={reply._id}>
                              {/* <img
                                className="replyimage"
                                src={reply.userimage}
                                alt="img"
                              ></img> */}
                              <div>
                                <p>
                                  <b>{reply.user}</b>: {reply.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <form onSubmit={(e) => handleReplyReview(e, review)} className="handle">
                        <TextField
                        className="replyhere"
                          placeholder="Reply"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <Button type="submit"
                        style={{
                          background: "red",
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                          height: "2em"
                        }}>Submit</Button>
                      </form>
                    </div>
                  )}
                </div>

                <div className="btns">
                  <div className="likes">
                    {review.likes.length}
                    <ToggleButton
                      className="like-btn"
                      onClick={(e) => handleLikeReview(e, review)}
                      style={{
                        background: "red",
                        height: "2em"
                      }}
                    >
                      <FavoriteBorderIcon />
                    </ToggleButton>
                  </div>

                  {/* <button onClick={() => handleShowEditForm(review.review)}>
                    Edit
                  </button> */}
                  <Button
                    onClick={() => {
                      handleshowreply(!showreply);
                    }}
                    style={{
                      background: "red",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      height: "2em"
                    }}
                  >Reply</Button>

                  <Button onClick={(e) => handleDeleteReview(e, review)}
                    style={{
                      background: "red",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      height: "2em"
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserReviews;
