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
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
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
