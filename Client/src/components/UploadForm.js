import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { createUpload, updateUpload } from "../actions/uploads";

const UploadForm = ({ currentId, setCurrentId }) => {
  const [uploadData, setUploadData] = useState({
    myFile: "",
    title: "",
  });

  const upload = useSelector((state) =>
    currentId ? state.uploads.find((upload) => upload._id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (upload === currentId) {
      setUploadData(upload);
    }
  }, [upload, currentId]);

  const clear = () => {
    setCurrentId(0);
    setUploadData({ mydFile: "", title: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createUpload(uploadData));

      clear();
    } else {
      dispatch(updateUpload(currentId, uploadData));
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
