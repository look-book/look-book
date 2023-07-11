import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Card className="cardPost">
        <div className="cardContent">
          <CardMedia>
            <img
              src={post.selectedFile}
              alt={post.title}
              className="postImage"
            />
          </CardMedia>

          <div className="cardInfo">
            <Typography variant="p" component="p">
              Caregiver's name: <b>{post.creator}</b>
            </Typography>
            <Typography variant="p" component="p">
              Alzheimer patient's age: <b>{post.age}</b>
            </Typography>
            <Typography variant="body2" className="timePost">
              {moment(post.createdAt).fromNow()}
            </Typography>

            <Typography color="textSecondary" component="p">
              How does your patient feels about this photo?{" "}
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>

            <Typography className="" gutterBottom variant="p" component="h5">
              {post.title}
            </Typography>

            <CardContent>
              <Typography color="textSecondary" variant="p" component="p">
                {post.message}
              </Typography>
            </CardContent>
        
          <CardActions className="card-action">
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likePost(post._id))}
            >
              <ThumbUpAltIcon fontSize="small" className="tumbicon" />{" "}
              {post.likeCount} Likes{" "}
            </Button>
          </CardActions>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Post;