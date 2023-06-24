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
        <h2>Caregivers Posts</h2>
        <p>
          By sharing your experience with Alzheimers patient, together we can
          create a way to make their memory active. You can search which images triggers their all kinds of emotions, and what are the patient's age.
        </p>
        <br></br>

        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={8}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
        <br></br>
      </div>
    </>
  );
};

export default Album;
