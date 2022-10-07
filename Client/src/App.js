import "./index.css";
//import NavBarOne from './components/NavBarOne'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Navigate
} from "react-router-dom";
import Filters from "./components/Filters";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import People from "./components/People";
import Gallery from "./Gallery";
import Upload from "./components/Upload";
import Coaching from "./components/Coaching";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import Sidebar from "./components/Sidebar";
import Account from "./components/Account";
import Billing from "./components/Billing";
import Notifications from "./components/Notifications";
import ResetPassword from "./components/ResetPassword";
import AddAlbum from "./components/AddAlbum";
import Profile from "./components/Profile";
import Album from "./components/Album";
function App() {
  return (
    <div className="App">
      <Sidebar prop="user" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/*
                    <Route exact path="/Login" element={user ? <Navigate to="/Album"/>:<Login/>} />
                    <Route exact path="/Register" element={user ? <Navigate to="/Album"/>:<Register/>} />
            */}

          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Filters" element={<Filters />} />
          <Route exact path="/People" element={<People />} />
          <Route exact path="/Gallery" element={<Gallery />} />
          <Route exact path="/AddAlbum" element={<AddAlbum />} />
          <Route exact path="/Upload" element={<Upload />} />
          <Route exact path="/Coaching" element={<Coaching />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/Account" element={<Account />} />
          <Route exact path="/Billing" element={<Billing />} />
          <Route exact path="/Album" element={<Album />} />
          <Route exact path="/Notifications" element={<Notifications />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
