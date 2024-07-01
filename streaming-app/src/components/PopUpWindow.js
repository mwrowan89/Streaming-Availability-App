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
        <div>
          {result && (
            <div className="pop-up-results">
              <h1>{result.title}</h1>
              <p>{result.overview}</p>
              <p>{result.release_date}</p>
              <p>{result.vote_average}</p>
              <p>{result.vote_count}</p>

              <button onClick={onRequestClose}>Close</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PopUpWindow;
