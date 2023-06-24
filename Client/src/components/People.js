import React, { useState, useEffect } from "react";
import avatar from "../assets/subProfile.png"

const People = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
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
      <h1>Members' Profile </h1>
      <div className="columnMember">
        {data.map((data, i) => (
          <div className="userMember" key={i}>
            <button className="addContact">+</button>
            <img
              src={avatar}
              alt="userProfile"
              width="80"
              className="userProfile"
            />
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p>
              <a href={`mailto:${data.username}`} className="linkMail">
                {data.username}
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default People;
