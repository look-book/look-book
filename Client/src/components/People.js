import React, { useState, useEffect } from "react";
import avatar from "../assets/subProfile.png";

const People = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => alert(err));
  }, [data]);

  return (
    <section className="memberBox">
      <h3>Members' Profile </h3>
      <br></br>
      <div className="colMember row">
        {data.map((data, i) => (
          <div className="userMember" key={i}>
            <img
              src={data.picture ? data.picture : avatar}
              alt="userProfile"
              className="userProfile"
            />
            <p>
              {data.firstName}{" "} {data.lastName}
              <br></br>
              <a href={`mailto:${data.email}`} className="linkMail">
                {data.email ? data.email : data.username}
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default People;
