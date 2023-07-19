import React from "react";
import People from "./People";
import Locations from "./Locations";

function Filters() {
  return (
    <section className="filterBox">
      <br></br>
      <div className="membersBox">
        <People />
      </div>
      <Locations />
    </section>
  );
}

export default Filters;
