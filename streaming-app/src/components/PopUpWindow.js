import React from "react";
import Modal from "react-modal";
import "./PopUpWindow.css";

Modal.setAppElement("#root");

const PopUpWindow = ({ isOpen, onRequestClose, result }) => {
  return (
    <div>
      <Modal
        className={"pop-up-window"}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Result Details"
      >
        <div className="pop-up">
          {result && (
            <div className="pop-up-results">
              <img
                src={
                  result.poster_path && result.Poster !== "N/A"
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : "./NotFound.jpeg"
                }
                alt={`${result.Title} poster`}
              />
              <h1>{result.title || result.original_name}</h1>
              <p>{result.overview}</p>
              <div className="pop-up-results-more-info">
                <p>Release Date: {result.release_date}</p>
                <p>
                  TMDB Viewer Rating: {Math.round(result.vote_average)} / 10
                </p>
                <p>Vote Count: {result.vote_count}</p>
              </div>

              <h2 className="close-x" onClick={onRequestClose}>
                X
              </h2>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PopUpWindow;
