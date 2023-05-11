import React from "react";
import { Link } from "react-router-dom";

function Landing(){
  
    return (
      <div className="">
        <p className="subHeader">
        Memories are timeless treasures of the heart. Happy times come and go, but the memories stay forever. A photograph keeps a moment from running away. A photograph is the pause button of life.
        </p>
        <br></br>
        <div className="col">
          <Link to="/register" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn">
            Log In
          </Link>
        </div>
      </div>
    );
  }
export default Landing;
