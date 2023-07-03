import React from "react";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Navigate
} from "react-router-dom";

import Filters from "./components/Filters";
import Home from "./components/Home";
import People from "./components/People";
import Coaching from "./components/Coaching";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import Notifications from "./components/Notifications";
import PasswordReset from "./components/ResetPassword";
import FAQ from "./components/FAQ";
import ProfilePage from "./components/ProfilePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Album from "./components/Album";
import Navbar from "./components/Navbar";
import Upload2 from "./components/Upload2";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Result from "./components/Result";
import { CheckUserExist } from "./helper/helper";
import ProfileFb from "./components/ProfileFb";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/loginUser" element={<Login />} />
          <Route exact path="/registerUser" element={<Register />} />
          <Route exact path="/userProfile/:userId" element={<ProfilePage />} />
          <Route exact path="/filters" element={<Filters />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profileFb" element={<ProfileFb/>} />
          <Route exact path="/people" element={<People />} />
          <Route
            exact
            path="/resultTest"
            element={
              <CheckUserExist>
                <Result />
              </CheckUserExist>
            }
          />

          <Route exact path="/coaching" element={<Coaching />} />
          <Route exact path="/post" element={<Album />} />
          <Route exact path="/aboutUs" element={<AboutUs />} />
          <Route exact path="/contactUs" element={<ContactUs />} />
          <Route exact path="/fAQ" element={<FAQ />} />
          <Route exact path="/album" element={<Upload2 />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/resetPassword" element={<PasswordReset />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
