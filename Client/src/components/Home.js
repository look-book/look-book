import React from "react";
import Landing from "./Landing";
import backgroundVideo from "../assets/_import_624eae819769f2.40410376_FPpreview.mp4";


function Home() {
  return (
    <section className="homepage">
       <video src={backgroundVideo} autoPlay loop muted/> 
      <div className="homeBox">
        <h1>“We do not remember days, we remember moments.”</h1>
        <Landing />
      </div>
    </section>
  );
}

export default Home;
