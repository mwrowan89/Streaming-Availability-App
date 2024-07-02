import React from "react";
import Modal from "react-modal";
import "./PopUpWindow.css";

Modal.setAppElement("#root");

const PopUpWindow = ({ isOpen, onRequestClose, result }) => {
  return (
    <div className="pop-up-window">
      <Modal
        className={"pop-up-window"}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Result Details"
      >
        <div>
          {result && (
            <div className="pop-up-results">
              <h1>{result.title}</h1>
              <p>{result.overview}</p>
              <div className="pop-up-results-more-info">
                <p>Release Date: {result.release_date}</p>
                <p>TMDB Viewer Rating: {result.vote_average}</p>
                <p>Vote Count: {result.vote_count}</p>
              </div>

              <button onClick={onRequestClose}>Close</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PopUpWindow;
