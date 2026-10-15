import { getStatusLabel } from "../studentUtils.js";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Course</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Show one row for each student. */}
        {students.map((student) => (
          <tr key={student.studentId}>
            <td data-label="ID">{student.studentId}</td>
            <td data-label="Full name">{student.fullName}</td>
            <td data-label="Age">{student.age}</td>
            <td data-label="Email">{student.email}</td>
            <td data-label="Course">{student.course}</td>
            <td data-label="Status">
              <span className={student.enrollmentStatus ? "badge active" : "badge inactive"}>
                {getStatusLabel(student.enrollmentStatus)}
              </span>
            </td>
            <td data-label="Actions">
              <div className="row-actions">
                <button
                  className="btn small"
                  onClick={() => onEdit(student)}
                  aria-label={`Edit ${student.fullName}`}
                >
                  Edit
                </button>
                <button
                  className="btn small danger"
                  onClick={() => onDelete(student)}
                  aria-label={`Delete ${student.fullName}`}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
