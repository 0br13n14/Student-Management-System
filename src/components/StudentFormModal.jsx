import { useState } from "react";
import Modal from "./Modal.jsx";
import {
  EMPTY_FORM,
  validateStudent,
  buildStudentRecord,
} from "../studentUtils.js";

function StudentFormModal({ mode, initialValues, students, onSubmit, onClose }) {
  const isEdit = mode === "edit";

  const [values, setValues] = useState({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check the form before saving.
    const foundErrors = validateStudent(
      values,
      students,
      isEdit ? initialValues.studentId : null
    );
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;
    onSubmit(buildStudentRecord(values));
  };

  const renderError = (field) =>
    errors[field] ? (
      <span className="error" id={`${field}-error`} role="alert">
        {errors[field]}
      </span>
    ) : null;

  return (
    <Modal title={isEdit ? "Edit Student" : "Add Student"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Student ID
          <input
            name="studentId"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={values.studentId}
            onChange={handleChange}
            aria-invalid={Boolean(errors.studentId)}
          />
          {renderError("studentId")}
        </label>

        <label>
          Full name
          <input
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.fullName)}
          />
          {renderError("fullName")}
        </label>

        <label>
          Age
          <input
            name="age"
            type="number"
            min="16"
            value={values.age}
            onChange={handleChange}
            aria-invalid={Boolean(errors.age)}
          />
          {renderError("age")}
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
          />
          {renderError("email")}
        </label>

        <label>
          Course
          <input
            name="course"
            value={values.course}
            onChange={handleChange}
            aria-invalid={Boolean(errors.course)}
          />
          {renderError("course")}
        </label>

        <label className="checkbox">
          <input
            name="enrollmentStatus"
            type="checkbox"
            checked={values.enrollmentStatus}
            onChange={handleChange}
          />
          Currently enrolled (Active)
        </label>

        <div className="actions">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn primary">
            {isEdit ? "Save changes" : "Add student"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default StudentFormModal;
