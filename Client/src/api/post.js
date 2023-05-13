import axios from 'axios';

const url =  'http://localhost:5000/posts' || 'https://look-book-act-group42.herokuapp.com/';
//defining  options
const options = {
  origin: ["http://localhost:5000/posts", "https://look-book-act-group42.herokuapp.com/"],
   mode: "cors",
  credentials: "include",
  optionSuccessStatus: 200,
  header: {
    "Access-Control-Allow-Origin": "https://look-book-act-group42.herokuapp.com",
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Private-Network": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};


export const fetchPosts = () => axios.get(url, options);
export const createPost = (newPost) => axios.post(url, newPost, options);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`, options);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost, options);
export const deletePost = (id) => axios.delete(`${url}/${id}`, options);


