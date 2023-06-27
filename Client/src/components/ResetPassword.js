import React, { useState, useEffect } from "react";
import avatar from "../assets/subProfile.png";
import axios from "axios";
import "../assets/css/settings.css";
import { useParams } from "react-router-dom";

export default function Settings({ match }) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({});
  const { userId } = useParams(match);

  useEffect(() => {
    fetch(`/api/user/${userId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => alert(err));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      firstName,
      lastName,
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
      const res = await axios.put(`/api/user/${userId}`, updatedUser);
      setSuccess(true);
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : avatar} alt="" />

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
            placeholder={user.username}
            value={user.username}
            onChange={(e) => setUsername(e.target.value)}
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
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
