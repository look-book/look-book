import './index.css';
import NavBarOne from './components/NavBarOne'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Filters from './components/Filters';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import People from './components/People';
import Gallery from './Gallery';
import Upload from './components/Upload';
import Coaching from './components/Coaching';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import NotFound from './components/NotFound';



function App() {
  return (
    <div className="App">
      <Router>
        <NavBarOne />
        <br/><br/>
<Routes>
  
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Filters" element={<Filters />} />
          <Route exact path="/People" element={<People />} />
          <Route exact path="/Gallery" element={<Gallery />} />
          <Route exact path="/Upload" element={<Upload />} />
          <Route exact path="/Coaching" element={<Coaching />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </div>

  );
}

export default App;