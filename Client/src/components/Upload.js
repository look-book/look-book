import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import CommentsIcon from "@mui/icons-material/ExpandMore";
import { CheckUserExist } from "../helper/helper";
import Quiz from "./Quiz";
import IconButton from "@mui/material/IconButton";

/** Custom Hook */
import { setUserId, setLocation } from "../redux/result_reducer";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Upload = ({ upload }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [expanded, setExpanded] = useState(false);

  const inputRefUser = useRef(null);
  const inputRefLoc = useRef(null);

  function startQuiz() {
    if (inputRefUser.current?.value) {
      dispatch(setUserId(inputRefUser.current?.value));
      dispatch(setLocation(inputRefLoc.current?.value));
    }
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

        <CardActions disableSpacing className="d-flex">
          Want to take a memory test?{" "}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="expand"
          >
            <CommentsIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form id="form">
            <div>
              {" "}
              <AccountCircle /> Patient Name:{" "}
              <input
                ref={inputRefUser}
                className="userid"
                type="text"
                name="username"
                placeholder="Name"
              />{" "}
              <HomeIcon /> State Location:{" "}
              <input
                ref={inputRefLoc}
                className="location"
                type="text"
                name="location"
                placeholder="State Location"
              />{" "}
            </div>
          </form>

          <div className="start">
            <Link className="btn" to="/album" onClick={startQuiz}>
              Start Quiz
            </Link>
          </div>
          <CheckUserExist>
            <Quiz />
          </CheckUserExist>
        </Collapse>
      </Card>
    </>
  );
};

export default Upload;
