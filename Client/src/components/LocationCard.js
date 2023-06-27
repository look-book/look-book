import React from "react";

function LocationCard() {
  return (
    <section className="contentBox">
      <div class="mapouter">
        <div class="gmap_canvas">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26553163.31788308!2d-116.91666751846782!3d35.66831053850951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1687823412805!5m2!1sen!2sus" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" title="location" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div></div><br></br><br></br>
    </section>
  );
}

export default LocationCard;
