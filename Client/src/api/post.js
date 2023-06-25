import axios from 'axios';

//"http://localhost:5000/posts" ||
 const url = "http://localhost:5000/posts" || "https://look-book-act-group42.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost` );
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);


