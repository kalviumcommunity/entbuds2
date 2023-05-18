import React, { useEffect, useState } from "react";
import "./UserReviews.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserReviews = (props) => {
  const { user } = useAuth0();
  const { name } = props;
  const { username } = props;
  const [CustReviews, setCustReviews] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [showreply, handleshowreply] = useState(true);
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
            userimage: user.picture,
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
              <div style={{display:"flex", padding:"2%", width:"96%"}}>
                <img src={ review.image ?review.image :<AccountCircleIcon />} className="ppic" style={{borderRadius:"100px", width:"6%", height:"6%", border:"2px solid red", padding:"2px"}} alt="prof_pic" />
                <div style={{width:"60%"}}>
                  <h2 style={{margin:"0%", padding:"0% 2%", textAlign:"left"}}>{review.name}</h2>
                  <p key={review._id} style={{color:"red", margin:"0%", textAlign:"left", padding:"2%"}}>{review.review}</p>
                </div>
                <div className="btns" style={{ padding:"2%", width:"30%", display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"start"}}>
                  <div className="likes">
                    <FavoriteBorderIcon onClick={(e) => handleLikeReview(e, review)} sx={{ fontSize: 16 }} />
                    <b className="lc" style={{fontSize:"medium"}}>{review.likes.length}</b>
                  </div>
                  {user && review.name === user.name && (
                    <EditIcon onClick={() => handleShowEditForm(review.review)} sx={{ fontSize: 16 }} />
                  )}
                  <ReplyIcon onClick={() => { handleshowreply(!showreply); }} sx={{ fontSize: 16 }} />
                  {user && review.name === user.name && (
                    <DeleteIcon onClick={(e) => handleDeleteReview(e, review)} sx={{ fontSize: 16 }} />
                  )}
                </div>
              </div>
                  {showEditForm && (
                    <form onSubmit={(e) => handleEditReview(e, review)}>
                      <input type="text" placeholder="Edit Review" value={editText} onChange={(e) => setEditText(e.target.value)} />
                      <button type="submit">Save</button>
                    </form>
                  )}

              <div className="textrev">

                {/* {showreply && (
                  <div className="replysection">
                    {review.replies && (
                      <div className="replies">
                        {review.replies.map((reply) => (
                          <div className="reply" key={reply._id}>
                            <img className="rpic" src={reply.userimage} alt="img" ></img>
                            <div className="userrepl">
                              <h3>{reply.user}</h3>
                              <p> {reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <form onSubmit={(e) => handleReplyReview(e, review)} className="handle">
                      <div className="replyform">
                        <TextField className="replyhere" placeholder="Add your reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ height: "4vmax", width: "30vmin", marginRight: "63em"}} />
                        <Button type="submit" style={{ background: "red", color: "black", display: "flex", alignItems: "center", height: "2em"}}>Submit</Button>
                      </div>
                    </form>
                  </div>
                )} */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserReviews;
