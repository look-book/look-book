import React, { useState} from "react";
import axios from "axios";
import Upload2 from "./Upload2";
import { Container } from "@mui/material";


const url = "http://localhost:5000/uploads" || "https://look-book-act-group42.herokuapp.com/uploads";

const options = {
        origin: ["http://localhost:3000" , "https://look-book-act-group42.herokuapp.com/"],
        method: "POST",
        credentials: "include",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "https://look-book-act-group42.herokuapp.com/uploads",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
};

function Upload() {
  const [data, setData] = useState({ myFile: ""});

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(data);
    console.log("Uploaded");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setData({ ...data, myFile: base64 });
  };

  return (
    <div className="galleryBox">
      <div className="uploadForm">
      <form onSubmit={handleSubmit}>
        <h1>Share your photos or browse below</h1>
        <label htmlFor="file-upload" className="custom-file-upload"></label>
        <input
          type="file"
          lable="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <button type="submit">Submit</button>
      </form>
      </div><br></br>
      <Container>
        <h2>Photos Collections</h2><br></br>
       <Upload2 />
      </Container>
    </div>
  );
}

export default Upload;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
