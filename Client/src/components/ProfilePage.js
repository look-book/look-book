import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import avatar from "../assets/subProfile.png";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function ProfilePage({ match }) {
  const { userId } = useParams(match);
  const [user, setUser] = useState({});

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
    <>
      <div className="userBox">
        <header className="flex flex-row justify-center p-5">
          {user.username ? (
            <>
            <div>
              <div className="arrowback">
                <KeyboardDoubleArrowLeftIcon />
                <Link to="/dashboard">Back to dashboard</Link>
              </div>
              <img className="avatar" src={avatar} alt="" />
              <h1 className="text-3xl py-5 px-3">
                {user.firstName} {user.lastName}
              </h1>

              <br></br>
              <h2>Biography</h2>

              <p>
                <b> Name:</b> {user.firstName} {user.lastName}
              </p>
              <p>
                <b>Email:</b>
                {user.username}
              </p>
              <p>
                <b>Bio:</b> {user.bio}
              </p>
              </div>
              
            </>
          ) : (
            <p>Hey! {user.firstName} you have set a bio yet.</p>
          )}
        </header>
        
        {user.canEdit !== "Not found" ? (
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
