import axios from 'axios';

//const url = "http://localhost:5000/uploads" 
 const url = "https://look-book-act-group42.herokuapp.com/uploads";

export const fetchUploads = () => axios.get(url);
export const createUpload = (newUpload) => axios.post(url, newUpload);
export const loveUpload = (id) => axios.patch(`${url}/${id}/loveUpload` );
export const happyUpload = (id) => axios.patch(`${url}/${id}/happyUpload` );
export const sadUpload = (id) => axios.patch(`${url}/${id}/sadUpload` );
export const scaredUpload = (id) => axios.patch(`${url}/${id}/scaredUpload` );
export const angryUpload = (id) => axios.patch(`${url}/${id}/angryUpload` );
export const updateUpload = (id, updatedUpload) => axios.patch(`${url}/${id}`, updatedUpload);
export const deleteUpload = (id) => axios.delete(`${url}/${id}`);

