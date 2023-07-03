import React from "react";
import "../assets/css/Result.css";
import { Link } from "react-router-dom";
import "../assets/css/Result.css"

import ResultTable from "./ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";

/** import actions  */
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import { usePublishResult } from "../hooks/setResult";

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId, location },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  /** store user result */
  usePublishResult({
    result,
    username: userId,
    location: location,
    attempts,
    points: earnPoints,
    achieved: flag ? "Memory is great!" : "Need Further Evaluation",
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title"><h2>Evaluation Summary</h2></h1>

      <div className="result flex-center">
        <div className="flex">
          <span>Patient Name</span>
          <span className="bold">{userId || userId.username}</span>
        </div>
        <div className="flex">
          <span>State</span>
          <span className="bold">{location || location.location}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Total Questions : </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className="flex">
          <span>Total Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div className="flex">
          <span>Total Earn Points : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Quiz Result</span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={"/album"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      <div className="container">
        {/* result table */}
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
