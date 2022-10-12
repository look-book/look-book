import React, { useState } from "react";

const Upload = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
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
    console.log(isFavorite);

    try {
      await fetch("album/upload/", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          tag: tag,
          userId: 3,
          data: base64EncodedImage,
          isFavorite: isFavorite,
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
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
          )}
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            aria-describedby="uidnote"
          />
          <label htmlFor="Title">tag:</label>
          <input
            type="text"
            id="tag"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            aria-describedby="uidnote"
          />
          <label htmlFor="Title">
            isFavorite:
            <input
              type="checkbox"
              // checked={this.state.checked}
              id="isFavorite"
              onChange={(e) => setIsFavorite(e.target.checked)}
              checked={isFavorite}
              // aria-describedby="uidnote"
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Upload;
