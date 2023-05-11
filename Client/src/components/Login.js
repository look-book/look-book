import React, {  useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ValidationError from "./ValidationError";
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
      setErrorMessage(data.message);
    } catch (err) {
      setErrorMessage(err);
    }
  }

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
       (data.isLoggedIn ? history.push("/dashboard") : null)
      )
      .catch((err) => setErrorMessage(err));
  }, [history]);

  const onGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const onFacebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
   <>
      <div className="contentBox">
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
          <div className="p-5 text-3xl font-extrabold">Login</div>
          <form
            className="mx-5 flex flex-col w-72"
            onSubmit={(e) => handleLogin(e)}>
          {errorMessage == "Success"  ?  <Navigate to="/dashboard"/> :  <ValidationError message={errorMessage} />}
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
            <input
              className="submitBtn"
              type="submit"
              value="LOGIN"
            /><br></br>
            <Link to="/resetPassword" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
            <br></br>
            <div className="flex flex-row items-center justify-center">
              <h2>Don't have an account?</h2>
              <Link
                className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center"
                to="/register"
              >
                REGISTER
              </Link>
            </div>
        </form>
          <br></br>

          <div className="center">
            <hr></hr>
            <div className="or">OR</div>
          </div>

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
    </>
  );
}

export default Login;
