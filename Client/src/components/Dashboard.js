import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/_import_624eae819769f2.40410376_FPpreview.mp4";
import { Container } from "@mui/material";

const Dashboard = () => {
  const [user, setUser] = useState(null);

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

  return (
    <Container>
      <section className="profileBox">
        {user ? (
          <>
            <div className="profileInfo">
              <div className="list">
                <div className="listItem ">
                  <img
                    src={user.profile}
                    alt=""
                    width="120"
                    height="120"
                    className="profile"
                  />
                </div>

                <br></br>
                <h4 className="listItem">{user.name.first_name}</h4>
              </div>{" "}
              <h2>Biography</h2>
              <p>
                <b>Given name:</b>
                {user.name.last_name}
              </p>
              <p>
                <b>Family name:</b> {user.name.last_name}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
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

export default Dashboard;
