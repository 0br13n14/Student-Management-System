import Modal from "./Modal.jsx";

// Ask before removing a student.
function DeleteConfirmModal({ student, onConfirm, onClose }) {
  return (
    <Modal title="Delete Student" onClose={onClose}>
      <p>
        Are you sure you want to delete <strong>{student.fullName}</strong> (
        {student.studentId})? This cannot be undone.
      </p>
      <div className="actions">
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;
