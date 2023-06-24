import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createUpload, updateUpload } from "../actions/uploads";
import { useParams } from "react-router";

const UploadForm = ({ match }) => {
  const { userId } = useParams(match);
  const [user, setUser] = useState({});
  const [authorName, setAuthorName] = useState(userId);

  const [uploadData, setUploadData] = useState({
    myFile: "",
    title: "",
    authorName,
  });

  const upload = useSelector((state) =>
    userId ? state.uploads.find((upload) => upload._id === userId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/user/${userId}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => alert(err));
  }, [userId]);

  useEffect(() => {
    if (upload === userId) {
      setUploadData(upload);
      setAuthorName(userId)
    }
  }, [upload, userId]);

  const clear = () => {
    setUploadData({ mydFile: "", title: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.username) {
      dispatch(createUpload(uploadData));
      setAuthorName(userId);
      clear();
    } else {
      dispatch(updateUpload(userId, uploadData));
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
