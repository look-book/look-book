import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post/Post";
import { getPosts } from "../../actions/posts";

function Album() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [q, setQ] = useState("");
  const [searchParam] = useState(["title", "tags", "age"]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const posts = useSelector((state) => state.posts);

  function search(posts) {
    return posts.filter((post) => {
      return searchParam.some((newItem) => {
        return (
          post[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <>
      <div className="searchPost">
        <TextField
          id="outlined-basic"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Search categories..."
        />
      </div>
      <br></br>
      <Grid className="posts" container spacing={3}>
        {search(posts).map((post) => (
          <>
            <Grid key={post._id} item xs={12} sm={12}>
              <Post
                post={post}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}

export default Album;
