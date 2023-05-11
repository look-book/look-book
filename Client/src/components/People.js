import React, { useState, useEffect } from "react";

const People = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
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
        {data.map((data) => (
          <div className="userMember">
            <button className="addContact">+</button>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlf26-P4BSopUQrgSpw5dCKDLbGAyhHO6Kzw&usqp=CAU"
              alt=""
              width="120"
              className="userProfile"
            />
            <h4>
              {data.firstName} {data.lastName}
            </h4>
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
