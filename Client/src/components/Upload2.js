import React, { useEffect, useState } from "react";

function Upload2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/uploads`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => alert(err));
  }, [data]);

  return (
    <div className="gallerySection">
      {data.map((data, index) => (
        <div>
          <img src={data.myFile} alt="" className="upload" key={index} />
          <br></br>
          <div className="checkbox">
            <input type="checkbox" value={data.id} /> <span>Add image</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Upload2;
