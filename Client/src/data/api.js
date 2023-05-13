import axios from 'axios';

const apiUrl =  'http://localhost:5000/api/' || 'https://look-book-act-group42.herokuapp.com/';

//defining  options
const options = {
  origin: ["http://localhost:5000/api/", "https://look-book-act-group42.herokuapp.com/"],
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

export const singleFileUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'singleFile', data, options);
    } catch (error) {
        throw error;
    }
}
export const getSingleFiles = async () => {
    try {
            const {data} = await axios.get(apiUrl + 'getSingleFiles');
            return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}
export const getMultipleFiles = async () => {
    try{
        const {data} = await axios.get(apiUrl + 'getMultipleFiles');
        return data;
    }catch(error){
        throw error;
    }
}
