import React from "react";

import "./index.css";
//import NavBarOne from './components/NavBarOne'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Navigate
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import Home from "./components/Home";
import People from "./components/People";
import Coaching from "./components/Coaching";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import PasswordReset from "./components/ResetPassword"
import Profile from "./components/Profile";
import Album from "./components/Album";
import FAQ from "./components/FAQ";
import ProfilePage from "./components/ProfilePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Albums from "./components/Albums";


function App(props) {
  
  return (
    <div className="App">
      <Sidebar props="user" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/user/:userId" element={<ProfilePage />} />
          <Route exact path="/filters" element={<Filters />} />
          <Route exact path="/people" element={<People />} />
          <Route exact path="/coaching" element={<Coaching />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/aboutUs" element={<AboutUs />} />
          <Route exact path="/contactUs" element={<ContactUs />} />
          <Route exact path="/fAQ" element={<FAQ />} />
          <Route exact path="/post" element={<Album />} />
          <Route exact path="/album" element={<Albums/>} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/resetPassword" element={<PasswordReset />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
