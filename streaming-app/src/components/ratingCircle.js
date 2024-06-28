import React from "react";
import "./RatingCircle.css";

const RatingCircle = ({ value }) => {
  const roundedValue = Math.round(value);

  let colorClass = "";

  if (roundedValue >= 0 && roundedValue < 25) {
    colorClass = "red";
  } else if (roundedValue >= 25 && roundedValue < 50) {
    colorClass = "orange";
  } else if (roundedValue >= 50 && roundedValue < 75) {
    colorClass = "yellow";
  } else if (roundedValue >= 75 && roundedValue <= 100) {
    colorClass = "green";
  }

  return (
    <div>
      {value && (
        <div
          className={`progress ${colorClass}`}
          data-value={roundedValue + "%"}
        ></div>
      )}
    </div>
  );
};

export default RatingCircle;
