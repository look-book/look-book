import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';


const Posts = ({currentId, setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className="" container  spacing={2}>
        {posts.map((post) => (
          <>
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </>
        ))}
      </Grid>
    )
  );
};

export default Posts;

