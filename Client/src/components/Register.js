import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const history = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      firstName: form[0].value,
      lastName: form[1].value,
      username: form[2].value,
      password: form[3].value,
      confirmPassword: form[4].value,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      setIsLoggedIn(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (isLoggedIn ? history.push("/login", data) : null))
      .catch((err) => console.log(err));
  }, [isLoggedIn, history]);

  return (
    <div className="contentBox">
      <div className="">
        <div className="">Register</div>

        <form
          className="mx-5 flex flex-col w-72"
          onSubmit={(e) => handleRegister(e)}
        >
          <label htmlFor="firstName">Firstname</label>
          <input
            className="input-field"
            type="text"
            name="firstName"
            id="firstName"
          />

          <label htmlFor="lastName">LastName</label>
          <input
            className="input-field"
            type="text"
            name="lastName"
            id="lastName"
          />

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="input-field"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <br></br>

          <input className="submitBtn" type="submit" value="REGISTER" />
          <div className="">
            <h2>Already have an account?</h2>
            <Link className="link" to="/login">
              LOGIN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
