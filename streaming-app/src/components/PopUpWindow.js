import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PopUpWindow = ({ isOpen, onRequestClose, result }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Result Details"
      >
        {result && (
          <div>
            <h1>{result.title}</h1>
            <p>{result.overview}</p>
            <p>{result.release_date}</p>
            <p>{result.vote_average}</p>
            <p>{result.vote_count}</p>

            <button onClick={onRequestClose}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PopUpWindow;
