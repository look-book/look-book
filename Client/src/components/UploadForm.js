import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { createUpload, updateUpload } from "../actions/uploads";

const UploadForm = ({ user, setUser }) => {

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? setUser(data) : null))
      .catch((err) => console.log(err));
  }, [setUser]);


  const [uploadData, setUploadData] = useState({
    myFile: "",
    title: "",
    authorName: user.username,
  });

  const upload = useSelector((state) =>
    user.username
      ? state.uploads.find((upload) => upload._id === user.username)
      : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (upload === user.username) {
      setUploadData({...upload, authorName: localStorage.getItem("token")});
      
    }
  }, [upload, user.username]);

  const clear = () => {
    setUploadData({ myFile: "", title: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.username) {
      dispatch(createUpload({...uploadData, authorName: user.username}));
      clear();
    } else {
      dispatch(updateUpload(user.username, uploadData));
      clear();
    }
  };

  return (
    <Paper className="postForm">
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          variant="outlined"
          placeholder="Photo name"
          fullWidth
          value={uploadData.title}
          onChange={(e) =>
            setUploadData({ ...uploadData, title: e.target.value })
          }
        />

        <div className="">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setUploadData({ ...uploadData, myFile: base64 })
            }
          />
        </div>

        <Button
          className=""
          variant="contained"
          color="inherit"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <br></br>
      </form>
    </Paper>
  );
};

export default UploadForm;
