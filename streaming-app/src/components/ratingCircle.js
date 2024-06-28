import React from "react";
import "./RatingCircle.css";

const RatingCircle = ({ value }) => {
  return (
    <div>{value && <div className="progress" data-value={value}></div>}</div>
  );
};

export default RatingCircle;
