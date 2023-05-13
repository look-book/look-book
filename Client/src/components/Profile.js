import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FileUploadScreen from "../screens/FileUploadScreen";
import { getSingleFiles, getMultipleFiles } from "../data/api";
import Upload from "./AlbumIndividual";
import moment from "moment"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [show, setShow] = useState("");
  const [active, setActive] = useState("");


  const getSingleFileslist = async () => {
    try {
      const fileslist = await getSingleFiles();
      setSingleFiles(fileslist);
      console.log(singleFiles);
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

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
        method: "cors"
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Private-Network": true,
          "Access-Control-Allow-Origin": "https://look-book-act-group42.herokuapp.com",
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

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };


  //function to show product description when chevron btn was clicked
  const handleClick = (event) => {
    setActive(event.target.id);
    setShow(event.target.id);
  };

  return (
    <section className="profileBox">
      {user ? (
        <>
          <div className="profileInfo">
            <div className="list">
              <div className="listItem">
                <button className="logout" onClick={logout}>
                  Logout
                </button>
                <img
                  src={user.photos[0].value}
                  alt=""
                  width="120"
                  height="120"
                  className="profile"
                />
              </div>

              <br></br>
              <p className="listItem">{user.displayName}</p>
              <p>
                <a href={`mailto:${user.emails[0].value}`} className="link">
                  {user.emails[0].value}
                </a>
              </p>
            </div>{" "}
            <h2>Biography</h2>
            <p>
              <b>Given name:</b> {user.name.givenName}
            </p>
            <p>
              <b>Family name:</b> {user.name.familyName}
            </p>
            <p>
              <b>Email:</b> {user.emails[0].value}
            </p>
          </div>
    
          <hr></hr>
          <FileUploadScreen
            getsingle={() => getSingleFileslist()}
            getMultiple={() => getMultipleFilesList()}
            setUser={setUser}
          />
         <Upload/>
         <h2>Single & Multiple File Upload </h2>
      <br></br>
      <div className="singleFile">
        <h4>Single Files List</h4>
        <br></br>
        <div className="singleAlbumBox">
          {singleFiles.map((file, index) => (
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
    
        
      </>
      ) : (
        <>
          <div className="loggedBox">
            <Link className="link" to="/login">
              <h1>LOGGED IN WITH YOUR GOOGLE ACCOUNT</h1>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
