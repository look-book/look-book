import React, { useState, useEffect } from "react";
import logo from "../assets/logo2.png";
import { useDispatch } from "react-redux";

function Navbar(token) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  async function logout() {
    localStorage.removeItem("token");
    dispatch(logout());
    window.location.reload(`/userProfile/${user.username}`);
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
      .then((data) => (data.isLoggedIn ? setUser(data) : null))
      .catch((err) => console.log(err));
  }, []);

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
          window.location.replace(`/profile/${user.userId}`)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  /*const logoutGoogle = () => {
    window.open("https://look-book-act-group42.herokuapp.com/auth/logout", "_self");
    //https://look-book-act-group42.herokuapp.com/
    window.location.reload("/profile");
  };*/

  const logoutSocial = () => {
    window.open(
      "https://look-book-act-group42.herokuapp.com/auth/logout",
      "_self"
    );
    window.location.reload(`/profile/${user.userId}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="logo" width="120px" className="logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {token && user ? (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/gallery"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gallery
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/filters">
                  Filters
                </a>
                <a className="dropdown-item" href="/album">
                  Album
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/post">
                  Posts
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/aboutUs">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contactUs">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/coaching">
                Guidelines
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/fAQ">
                Faq
              </a>
            </li>
            {user.userId ? (
              <>
                <li className="nav-item right">
                  <a
                    className="navbar-brand"
                    href={`/profile/${user.userId}`}
                  >
                    <img src={user.picture } alt="profile" width="40px" />
                  </a>
                </li>
                <button
                  className="profileLink"
                  id="logout"
                  onClick={logoutSocial}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <li className="nav-item right">
                  <a
                    className="navbar-brand"
                    href={`/userProfile/${user.username}`}
                  >
                    {user.picture ? <img src={user.picture} alt="profile" width="40px" />  : <img src="https://img.freepik.com/premium-photo/neon-iridescent-psychedelic-cat-generative-ai-based-any-actual-scene-pattern_108146-4007.jpg?w=1480" alt="profile" width="40px" />} 
                  </a>
                </li>

                <button className="profileLink" id="logout" onClick={logout}>
                  LOGOUT
                </button>
              </>
            )}
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/gallery"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gallery
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/filters">
                  Filters
                </a>
                <a className="dropdown-item" href="/album">
                  Album
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/post">
                  Posts
                </a>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/aboutUs">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contactUs">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/coaching">
                Guidelines
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/fAQ">
                Faq
              </a>
            </li>

            <li className="nav-item right">
              <a className="nav-link" href="/loginUser">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/registerUser">
                Register
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
