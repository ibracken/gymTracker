import ReactModal from "react-modal";
// Works fine
import "../css/WarningPopup.css";
// Used in delete-button-exercises component

const WarningPopup = ({ show, handleClose, handleDelete }) => {
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Warning Modal"
      className="modal-content" // Assign a class for styling
      overlayClassName="modal-overlay" // Assign a class for overlay styling
    >
      <div className="modal-container">
        {/* Warning message */}
        <p className="warning-message">Are you sure you want to delete this exercise?</p>
        
        {/* Buttons for confirmation and cancellation */}
        <button className="delete-button" onClick={handleDelete}>Yes, Delete</button>
        <button className="cancel-button" onClick={handleClose}>Cancel</button>
      </div>
    </ReactModal>
  );
};

export default WarningPopup;