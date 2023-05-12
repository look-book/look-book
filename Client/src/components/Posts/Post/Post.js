import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { likePost, deletePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Card className="cardPost">
        <div className="cardContent">
          <CardMedia>
            <Button
              style={{ color: "black" }}
              size="small"
              className="dotPost"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
            <img
              src={post.selectedFile}
              alt={post.title}
              className="postImage"
            />
            <br></br>
            <Typography variant="p">Creator: {post.creator}</Typography>
          </CardMedia>

          <div className="cardInfo">
            <Typography variant="body2" className="timePost">
              {moment(post.createdAt).fromNow()}
            </Typography>

            <Typography color="textSecondary" component="p">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>

            <Typography className="" gutterBottom variant="p" component="h2">
              {post.title}
            </Typography>

            <CardContent>
              <Typography color="textSecondary" variant="p">
                {post.message}
              </Typography>
            </CardContent>
          </div>
          <CardActions className="card-action">
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likePost(post._id))}
            >
              <ThumbUpAltIcon fontSize="small" /> {post.likeCount}{" "}
            </Button>
            
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post._id))}
              setCurrentId={setCurrentId}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
           
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default Post;
