import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
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
       window.location.replace("/")
      setErrorMessage(data.message);
    } catch (err) {
      setErrorMessage(err);
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
      .then((data) => (data.isLoggedIn ? history.push("/profile") : null))
      .catch((err) => setErrorMessage(err));
  }, [history]);


  const onGoogle = () => {
    window.open(
      "https://look-book-act-group42.herokuapp.com/auth/google",
      "_self"
    );
  };

  const onFacebook = () => {
    window.open(
      "https://look-book-act-group42.herokuapp.com/auth/facebook",
      "_self"
    );
  };

  return (
    <>
      <div className="contentBox">
        <div className="loginSection">
          Login
          {errorMessage}
          <form onSubmit={(e) => handleLogin(e)} className="loginForm">
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
            <Link to="/resetPassword" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
            </Link>

            <div className="flex  items-center justify-center">
              <h5>Don't have an account?</h5>
              <Link
                className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center"
                to="/register"
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
    </>
  );
}

export default Login;
