import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../assets/subProfile.png";
import Settings from "./ResetPassword";
import bgVideo from "../assets/_import_624eae819769f2.40410376_FPpreview.mp4";

function ProfilePage({ match }) {
  const { userId } = useParams(match);
  const [user, setUser] = useState({});

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

  async function changeUserInfo(e) {
    e.preventDefault();
    const form = e.target;
    const newBio = form[0].value;
    setUser({ ...user, bio: newBio });
    form[0].value = "";

    try {
      await fetch("/api/updateUserInfo", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newBio: newBio }),
      });
    } catch (err) {
      alert(err);
    }
    changeUserInfo();
  }

  return (
    <div className="userBox">
      <header className="flex flex-row justify-center p-1">
        {user.username ? (
          <>
            <div className="profileAccount">
              <div>
                <img className="avatar" src={avatar} alt="profile" />
                <br></br>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>

                <p>
                  <b>Email:</b>
                  {user.username}
                </p>
                <p>
                  <b>Bio:</b> {user.bio}
                </p>

                {user.canEdit !== "Not found" ? (
                  <>
                    <form onSubmit={(e) => changeUserInfo(e)} className="bio">
                      <label htmlFor="bio">Add or Change your Bio</label>

                      <textarea
                        type="text"
                        placeholder="Add bio..."
                        name="bio"
                        id="bio"
                      />

                      <input type="submit" value="Submit" />
                      <p className="text-sm my-1">1000 characters maximum</p>
                    </form>
                  </>
                ) : null}
              </div>

              <Settings />
            </div>
          </>
        ) : (
          <div className="logoutSection">
            <h2>You're logout successfully!</h2>
            <Link to="/loginUser">Signin back</Link>
            <div className="logoutVideo">
            <video src={bgVideo} autoPlay loop muted />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default ProfilePage;
