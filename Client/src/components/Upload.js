import React, { useState, useEffect} from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { Tooltip } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import {
  loveUpload,
  happyUpload,
  sadUpload,
  scaredUpload,
  angryUpload,
  deleteUpload,
} from "../actions/uploads";

const Upload = ({ upload }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});


  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? setUser(data) : null))
      .catch((err) => console.log(err));
  }, [setUser]);

  // Delete the post and redirect the user to the homepage
  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteUpload(upload._id));
    setUser(user);
  };

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        credentials: "include",
        SameSite: "none",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <>
      <Card className="p-2 cardImages" key={upload._id}>
        <CardMedia>
          <img src={upload.myFile} alt={upload.title} className="uploadImage" />
          <div className="reviews">
            <h6>How do you feel about this photo?</h6>
            <div>
              <Tooltip title="Love">
                <Button
                  className="iconbtn"
                  color="primary"
                  onClick={() => dispatch(loveUpload(upload._id))}
                >
                  <FavoriteIcon fontSize="small" className="tumbicon heart"/>{" "} {upload.loveCount}
                </Button>
              </Tooltip>
              <Tooltip title="Happy">
                <Button
                 className="iconbtn"
                  color="primary"
                  onClick={() => dispatch(happyUpload(upload._id))}
                >
                  <EmojiEmotionsIcon
                    fontSize="small"
                    className="tumbicon happy"
                  />{" "}
                  {upload.happyCount}
                </Button>
              </Tooltip>
              <Tooltip title="Sad">
                <Button
                 className="iconbtn"
                  color="primary"
                  onClick={() => dispatch(sadUpload(upload._id))}
                >
                  <SentimentVeryDissatisfiedIcon
                    fontSize="small"
                    className="tumbicon sad"
                  />{" "}
                  {upload.sadCount}
                </Button>
              </Tooltip>
              <Tooltip title="Scared">
                <Button
                 className="iconbtn"
                  color="primary"
                  onClick={() => dispatch(scaredUpload(upload._id))}
                >
                  <MoodBadIcon fontSize="small" className="tumbicon scared" />{" "}
                  {upload.sadCount}
                </Button>
              </Tooltip>
              <Tooltip title="Angry">
                <Button
                  className="iconbtn"
                  color="primary"
                  onClick={() => dispatch(angryUpload(upload._id))}
                >
                  <SentimentDissatisfiedIcon
                    fontSize="small"
                    className="tumbicon angry"
                  />{" "}
                  {upload.angryCount}
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardMedia>

        <div className="cardInfo">
          <div className="cardDel">
            <Typography variant="h6">{upload.title} </Typography>
            {upload.authorName === user.username ? (
              <DeleteIcon onClick={handleDelete} className="delete" />
            ) : null}
          </div>
          <Typography variant="p" className="author">
            Author: {upload.authorName ? upload.authorName : "Unknown"}
          </Typography>
          <Typography variant="body2" className="timePost">
            {moment(upload.createdAt).calendar()}
          </Typography>
        </div>
      </Card>
    </>
  );
};

export default Upload;