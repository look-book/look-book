import React from "react";
import People from "./People";
import Locations from "./Locations";


function Filters() {
  return (
    <section className="filterBox">
      <h1>Filters</h1>
      <p>
        This page will be a composite of all of the tags (including people and
        locations) that the members will create to describe their photos.
      </p>
     
      <br></br>
      <div className="membersBox">
        <People />
      </div>
      <br></br>
     
      <h3>Locations</h3>
      <Locations />
    </section>
  );
}

export default Filters;
