import React from "react";
import images from "./gallery.mock.json";
function Gallery() {
  console.log("images", images);
  return (
    <section className="contentBox">
      <h1>Gallery</h1>
      <p>This page will an Add Album page.</p>
    </section>
  );
}
export default Gallery;
