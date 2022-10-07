import React, { useState } from "react";

const Upload = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    console.log("submitting...");
    if (!selectedFile) return;

    uploadImage(previewSource);
  };
  const uploadImage = async (base64EncodedImage) => {
    // console.log(base64EncodedImage);

    try {
      await fetch("api/cloudinary/upload", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          location: location,
          userId: 3,
          data: base64EncodedImage,
        }),
        // body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      setErrMsg("something went wrong!");
    }
  };

  return (
    <div>
      <br />
      <section>
        <h1 className="title">Upload </h1>
        <form onSubmit={handleSubmitFile} className="form">
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            aria-describedby="uidnote"
          />
          <label htmlFor="Title">Location:</label>
          <input
            type="text"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            aria-describedby="uidnote"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </section>
    </div>
  );
};

export default Upload;
