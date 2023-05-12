import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post/Post";
import { getPosts } from "../../actions/posts";

function Album() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <CircularProgress/> :
    <Grid className="posts" container spacing={2}>
      {posts.map((post) => (
        <>
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Post
              post={post}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default Album;
