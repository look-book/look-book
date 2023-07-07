import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
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
} from "../actions/uploads";


const Upload = ({ upload}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Card className="p-2 cardImages">
        <div>
          <CardMedia>
            <img
              src={upload.myFile}
              alt={upload.title}
              className="uploadImage"
            />
            <br></br>
          </CardMedia>

          <div className="cardInfo">
            <Typography variant="h6">{upload.title} </Typography>
            <Typography variant="p" className="author">
              {upload.authorName}
            </Typography>
            <Typography variant="body2" className="timePost">
              {moment(upload.createdAt).calendar()}
            </Typography>
          </div>
          <CardActions className="card-action">
            {/* RATING */}
            <div className="reviews">
              <h6>How do you feel about this photo?</h6>
              <div>
                <Tooltip title="Love">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => dispatch(loveUpload(upload._id))}
                  >
                    <FavoriteIcon fontSize="small" className="tumbicon heart" />{" "}
                    {upload.loveCount}
                  </Button>
                </Tooltip>
                <Tooltip title="Happy">
                  <Button
                    size="small"
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
                    size="small"
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
                    size="small"
                    color="primary"
                    onClick={() => dispatch(scaredUpload(upload._id))}
                  >
                    <MoodBadIcon fontSize="small" className="tumbicon scared" />{" "}
                    {upload.sadCount}
                  </Button>
                </Tooltip>
                <Tooltip title="Angry">
                  <Button
                    size="small"
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
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default Upload;
