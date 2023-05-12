import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import Posts from "./Posts/Posts";
import { getPosts } from "../actions/posts";
import Form from "./Form";

const Album = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
    <div className="albumBox">
      <h2>Random Posts</h2><br></br>
      <Grow in>
        <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow><br></br>
    </div>
    </>
  );
};

export default Album;
