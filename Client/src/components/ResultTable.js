import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";
import "../assets/css/Result.css"

//const REACT_APP_HOST = "http://localhost:5000";
const REACT_APP_HOST = "https://look-book-act-group42.herokuapp.com"

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(`${REACT_APP_HOST}/api/result`, (res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Patient Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achieved || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
