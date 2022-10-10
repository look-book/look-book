import React, { useState } from "react";
import AlbumIndividual from "./AlbumIndividual";
import images from "./../gallery.mock.json";
function Album() {
  const [albumlist, setAlbumlist] = useState(images.resources);

  return (
    <div className="contentBox, imgGrid">
      <h1>Albums</h1>
      {albumlist.map((image) => (
        // <link href=""></link>
        <h1>{image.public_id}</h1>
        // <img className="imgAlbum" src={image.url} alt={image.public_id}></img>
      ))}
      {/* <p>This page will an Album page.</p> */}
      <AlbumIndividual />
    </div>
  );
}

export default Album;
