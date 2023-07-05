import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/_import_624eae819769f2.40410376_FPpreview.mp4";
import axios from "axios";
import { Container } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        credentials: "include",
        SameSite: "none",
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
          setIsLoading();
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
      firstName,
      lastName,
      email,
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
        {isLoading ? (
          <LoadingSpinner />
        ) : user ? (
          <>
            <>
              <div className="profileInfo">
                <div className="list">
                  <div className="listItem ">
                    <img
                      src={user.picture}
                      alt=""
                      width="120"
                      height="120"
                      className="profile"
                    />
                  </div>

                  <br></br>
                  <h4 className="listItem">
                    {user.displayName ? user.displayName : user.username}
                  </h4>
                </div>{" "}
                <h2>Biography</h2>
                <p>
                  <b>Given name:</b>
                  {user.firstName}
                </p>
                <p>
                  <b>Family name:</b> {user.lastName}
                </p>
                <p>
                  <b>Email:</b> {user.email}
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
                      <img src={user.picture} alt="profile" />

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
                      placeholder={user.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>LastName</label>
                    <input
                      type="text"
                      placeholder={user.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder={user.email}
                      value={user.email}
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
