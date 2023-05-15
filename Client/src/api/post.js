import axios from 'axios';

const url = "https://look-book-act-group42.herokuapp.com/posts";

const options = {
    header: {
      "Access-Control-Allow-Origin": "*",
      "Content-type":"application/json",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  

export const fetchPosts = () => axios.get(url, options);
export const createPost = (newPost) => axios.post(url, newPost, options );
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`, options);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost, options );
export const deletePost = (id) => axios.delete(`${url}/${id}`, options);


