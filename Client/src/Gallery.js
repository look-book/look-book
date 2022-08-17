import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
const Gallery = () => {
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await fetch("api/cloudinary/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);

  return (
    <section>
      <h1>Gallery</h1>
      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image
            key={index}
            cloudName="look-book"
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}
    </section>
  );
};

export default Gallery;