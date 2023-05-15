import React, { useState, useEffect } from "react";
import { singleFileUpload, multipleFilesUpload } from "../data/api";
import { CircularProgress } from "@mui/material";

const FileUploadScreen = (props) => {
  const [singleFile, setSingleFile] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [emotion, setEmotion] = useState("");
  const [singleProgress, setSingleProgress] = useState(0);
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/api/isUserAuth", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        'Content-type':'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? setUser(data) : null))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    const getUser = () => {
      fetch("https://look-book-act-group42.herokuapp.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
           "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);


  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    setSingleProgress(0);
    
  };

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setSingleProgress(percentage);
    },
  };

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);
    formData.append("name", name);
    formData.append("emotion", emotion);
    formData.append("username", user.username)
    formData.append("displayName", user.displayName)
    await singleFileUpload(formData, singleFileOptions);
    props.getsingle();
  };
  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("username", user.username);
    formData.append("displayName", user.displayName);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multipleFilesUpload(formData, mulitpleFileOptions);
    props.getMultiple();
  };

  return (
    <>
    <div className="formBox">
      <div className="formDiv">
        <div className="form-group">
          
          <label>Who/What is in this photo?</label>
          <select
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Who was in this photo?"
            name="name"
            id="name"
            className="form-control"
          >
            <option value="Parents/Older Family">Parents/Older Family</option>
            <option value="Children/Younger Family">
              Children/Younger Family
            </option>
            <option value="Friends">Friends</option>
            <option value="Acquintances">Acquintances</option>
            <option value="Strangers">Strangers</option>
            <option value="Memorable Object">Memorable Object</option>
          </select><br></br><br></br>
          <label>How does this photo make you feel? </label>
          
          <select
            type="text"
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="How does this photo make you feel? "
            className="form-control"
             name="emotion"
            id="emotion"
          >
            
            <option value="Love/Adoratio">Love/Adoration</option>
            <option value="Happiness">Happiness</option>
            <option value="Excited">Excited</option>
            <option value="Sad/Loneliness">Sad/Loneliness</option>
            <option value="Anger">Anger</option>
            <option value="Satisfaction">Satisfaction</option>
            <option value="Energize">Energize</option>
            <option value="Calmness">Calmness</option>
            <option value="Confusion">Confusion</option>
            <option value="Disappointment">Disappointment</option>
            <option value="Fear">Fear</option>
          </select><br></br><br></br>
          <label>Select Single File</label>
          <input
            type="file"
            name="singleFile"
            id="singleFile"
            className="form-control"
            onChange={(e) => SingleFileChange(e)}
          />
          <div>
            <button
              type="button"
              className="submitBtn"
              onClick={() => uploadSingleFile()}
      
            >
              Upload
            </button>
          </div>
          <div className="col-2">
            <CircularProgress
              value={singleProgress}
              text={`${singleProgress}%`}
            />
          </div>
        </div>
      </div>
      <div className="formDiv">
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title for your Album"
          className="form-control"
          name="title"
          id="title"
        />
        <br></br><br></br>
        <div className="form-group">
          <label>Select Multiple Files</label>
          <input
            type="file"
            name="multipleFiles"
            id="multipleFiles"
            onChange={(e) => MultipleFileChange(e)}
            className="form-control"
            multiple
          />
        </div>
        <div>
          <div>
            <button
              type="button"
              onClick={() => UploadMultipleFiles()}
              className="submitBtn"
              
            >
              Upload
            </button>
          </div>
          <div className="col-2">
            <CircularProgress
              value={multipleProgress}
              text={`${multipleProgress}%`}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FileUploadScreen;
