import React, { useState, useEffect } from "react";
import avatar from "../assets/profile.jpg";
import logo from "../assets/logo.png";


function Navbar({user}) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="logo" width="120px" />
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
        <ul className="navbar-nav mr-auto">
          {user ? (
            <>
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
            
              {user.username ? 
              <>
              <li className="nav-item right">
                <a className="navbar-brand" href={`/user/${user.username}`}>
                  <img src={avatar} alt="profile" width="40px" />
                </a>
              </li>
            
              <button className="profileLink" id="logout" onClick={logout}>
                LOGOUT
              </button>
              </>
              : 
              <>
              <li className="nav-item right">
                <a className="navbar-brand" href={`/profile`}>
                  <img src={avatar} alt="profile" width="40px" />
                </a>
              </li>
            
              <button className="profileLink" id="logout" onClick={logoutGoogle}>
                LOGOUT
              </button></>}
    
              </>
           
          ) : (
            <>
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
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
