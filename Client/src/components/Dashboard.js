import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FileUploadScreen from "../screens/FileUploadScreen";
import { getSingleFiles, getMultipleFiles } from "../data/api";
import Albums from "./Albums";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  async function logout() {
    localStorage.removeItem("token");
    window.location.reload("/dashboard");
  }

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
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? setUser(data) : null))
      .catch((err) => alert(err));
  }, []);


  return (
    <div className="accountBox">
      {user ? (
        <>
          <div className="profileNav">
            <Link to={"/user/" + user.username} className="profileLink">
              Profile
            </Link>

            <button className="profileLink" id="logout" onClick={logout}>
              LOGOUT
            </button>
          </div>
          <h1>
            Welcome, <span className="link">{user.username}</span>
          </h1>
          <FileUploadScreen
            getsingle={() => getSingleFileslist()}
            getMultiple={() => getMultipleFilesList()}
          />
          <div className="albumSection">
            <Albums />
          </div>
        </>
      ) : (
        <div className="loggedBox">
          <h1>Logged in or signup to access your account</h1>
          <div className="col">
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/login" className="btn">
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
