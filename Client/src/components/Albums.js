import React, { useState, useEffect } from "react";
import Upload from "./AlbumIndividual";
import moment from "moment";
import { getSingleFiles, getMultipleFiles } from "../data/api";

function Albums() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [show, setShow] = useState("");
  const [active, setActive] = useState("");

  const getSingleFileslist = async () => {
    try {
      const fileslist = await getSingleFiles();
      setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  };
  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleFileslist();
    getMultipleFilesList();
  }, []);

  //function to show product description when chevron btn was clicked
  const handleClick = (event) => {
    setActive(event.target.id);
    setShow(event.target.id);
  };

  return (
   <div className="albumBox">
      
        <Upload />
      
      <br></br>
      <h2>Single & Multiple File Upload </h2>
      <br></br>
      <div className="singleFile">
        <h4>Single Files List</h4>
        <br></br>
        <div className="singleAlbumBox">
          {singleFiles && singleFiles.map((file, index) => (
            <div className="singleAlbum">
              <img src={file.filePath} alt="img" width="100%" key={index} />

              <p className="author">Author:  {file.username  ? file.username : null }  -  {file.displayName  ?   file.displayName : null}</p>
              <p>
                Who/What was in this photo? - <b> {file.name}</b>
              </p>
              <p>
                How does this photo make you feel? - <b> {file.emotion}</b>
              </p>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <div className="multipleFile">
        <h3>Multiple Files List || Albums Collections</h3>
        <br></br>
        {multipleFiles &&
          multipleFiles.map((element, index) => (
            <div key={index}>
              <div className="albumBtn">
                <h6
                  onClick={handleClick}
                  key={index}
                  id={`${element._id}`}
                  className={
                    active === `${element._id}`
                      ? "fa fa-chevron-down active"
                      : "fa fa-chevron-up"
                  }
                >
                  {" "}
                  {element.title} Album {" - "} Created by:{" "}
                  <b>
                  {element.username ? element.username : null} -  {element.displayName ? element.displayName : null}
                  </b>
                  <p className="timePost">
                    {moment(element.createdAt).fromNow()}
                  </p>
                </h6>
              </div>
              {show === `${element._id}` ? (
                <div
                  className="albumsSection"
                  key={`${element._id}`}
                  id={`${element._id}`}
                  onClick={() => setShow()}
                >
                  {element.files.map((file, index) => (
                    <div className="cardAlbum">
                      <img
                        key={index}
                        src={`${file.filePath}`}
                        width="100%"
                        alt="img"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
      </div>
   </div>
  );
}

export default Albums;
