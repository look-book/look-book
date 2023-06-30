import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/_import_624eae819769f2.40410376_FPpreview.mp4";
import axios from "axios";
import { Container } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/api/uploads", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(`/api/user/profile`, updatedUser);
      setSuccess(true);
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <section className="profileBox">
        {user ? (
          <>
            <div className="profileInfo">
              <div className="list">
                <div className="listItem ">
                  <img
                    src={user.profilePic}
                    alt=""
                    width="120"
                    height="120"
                    className="profile"
                  />
                </div>

                <br></br>
                <h4 className="listItem">{user.displayName}</h4>
              </div>{" "}
              <h2>Biography</h2>
              <p>
                <b>Given name:</b>
              </p>
              <p>
                <b>Family name:</b> 
              </p>
              <p>
                <b>Email:</b> 
              </p>
            </div>
            <div className="settingsG bg-light">
              <div className="settingsWrapperG">
                <div className="settingsTitle">
                  <span className="settingsUpdateTitle">
                    Update Your Account
                  </span>
                </div>

                <form className="settingsFormG" onSubmit={handleSubmit}>
                  <label>Profile Picture</label>
                  <div className="settingsPP">
                    <img src={user.profilePic} alt="profile" />

                    <label htmlFor="fileInput">
                      <i className="settingsPPIcon far fa-user-circle"></i>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      name="file"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <label>FirstName</label>
                  <input
                    type="text"
                    placeholder={user}
                    onChange={(e) => setGivenName(e.target.value)}
                  />
                  <label>LastName</label>
                  <input
                    type="text"
                    placeholder={user}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user}
                    value={user}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label>Password</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="settingsSubmit" type="submit">
                    Update
                  </button>
                  {success && (
                    <span
                      style={{
                        color: "green",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      Profile has been updated...
                    </span>
                  )}
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="logoutSection">
              <h2>You're logout successfully!</h2>
              <Link to="/loginUser">Signin back</Link>
              <br></br>
              <div className="logoutVideo">
                <video src={bgVideo} autoPlay loop muted />
              </div>
            </div>
          </>
        )}
      </section>
    </Container>
  );
};

export default Profile;
