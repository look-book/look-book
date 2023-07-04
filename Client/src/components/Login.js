import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import ValidationError from "./ValidationError";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const history = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUser(data.token);
      setErrorMessage(data.message);
      window.location.replace(`/userProfile/${user.username}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(errorMessage);
    }
  }

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? history.push("/userProfile/:userId") : null
      )
      .catch((err) => console.log(err));
  }, [history, user]);

  const onGoogle = () => {
    window.open("https://look-book-act-group42.herokuapp.com/auth/google", "_self");
  };

  //https://look-book-act-group42.herokuapp.com/

  const onFacebook = () => {
    window.open("https://look-book-act-group42.herokuapp.com/auth/facebook", "_self");
  };

  return (
    <>
      <div className="contentBox">
        <div className="loginSection">
          <h4>Login</h4>
          <form onSubmit={(e) => handleLogin(e)} className="loginForm">
            <p className="errmsg">
              {" "}
              {errorMessage == "Success" ? (
                <Navigate to="/userProfile/:userId" />
              ) : (
                <ValidationError message={errorMessage} />
              )}
            </p>
            <label htmlFor="username">Email</label>
            <input
              className="input-field"
              type="text"
              name="username"
              id="username"
            />
            <label htmlFor="password">Password</label>
            <input
              className="input-field"
              type="password"
              name="password"
              id="password"
            />
            <br></br>
            <input className="submitBtn" type="submit" value="LOGIN" />
            <br></br>

            <div className="flex  items-center justify-center">
              <h6>Don't have an account?</h6>
              <Link
                className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center"
                to="/registerUser"
              >
                REGISTER
              </Link>
            </div>
          </form>
          <div className="center">
            <div className="or">OR</div>
          </div>

          <div className="social">
            <div className="loginButton google" onClick={onGoogle}>
              <img src={Google} alt="" className="icon" />
              Google
            </div>
            
            <div className="loginButton facebook" onClick={onFacebook}>
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div>
           
           
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}

export default Login;
