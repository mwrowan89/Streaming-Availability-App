import React from "react";
import "./RatingCircle.css";

const RatingCircle = ({ value }) => {
  const roundedValue = Math.round(value);
  return (
    <div>
      {value && (
        <div className="progress" data-value={roundedValue + "%"}></div>
      )}
    </div>
  );
};

export default RatingCircle;
