import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/_import_624eae819769f2.40410376_FPpreview.mp4";
import avatar from "../assets/subProfile.png";
import { Container } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const ProfileFb = () => {
  const [user, setUser] = useState(null);
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
          setIsLoading()
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <Container>
      <section className="profileBox">
    
        {user ? (
          <>
          {isLoading ? <LoadingSpinner/> : 
            <div className="profileInfo">
              <div className="list">
                <div className="listItem ">
                  <img
                    src={user.picture_pic ? user.profile_pic : avatar}
                    alt=""
                    width="120"
                    height="120"
                    className="profile"
                  />
                </div>

                <br></br>
                <h4 className="listItem">{user.displayName}</h4>
              </div>{" "}
            </div>}
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

export default ProfileFb;
