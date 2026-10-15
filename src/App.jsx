import { useState, useEffect } from "react";
import StudentTable from "./components/StudentTable.jsx";
import StudentFormModal from "./components/StudentFormModal.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import {
  loadStudents,
  saveStudents,
  addStudent,
  editStudent,
  deleteStudent,
} from "./studentUtils.js";

function App() {
  const [students, setStudents] = useState(loadStudents);
  const [modal, setModal] = useState({ type: null });

  // Save changes in this browser.
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const closeModal = () => setModal({ type: null });

  const handleAdd = (newStudent) => {
    setStudents((prev) => addStudent(prev, newStudent));
    closeModal();
  };

  const handleEdit = (updatedStudent) => {
    // Use the old ID to find this student.
    setStudents((prev) => editStudent(prev, modal.student.studentId, updatedStudent));
    closeModal();
  };

  const handleDelete = () => {
    setStudents((prev) => deleteStudent(prev, modal.student.studentId));
    closeModal();
  };

  const activeStudents = students.filter((student) => student.enrollmentStatus).length;
  const inactiveStudents = students.length - activeStudents;

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT</p>
          <h1>Student records</h1>
        </div>
        <button className="btn primary" onClick={() => setModal({ type: "add" })}>
          <span aria-hidden="true">+</span> Add student
        </button>
      </header>

      <section className="summary" aria-label="Student overview">
        <div className="summary-item">
          <span>Total students</span>
          <strong>{students.length}</strong>
        </div>
        <div className="summary-item">
          <span>Active</span>
          <strong>{activeStudents}</strong>
        </div>
        <div className="summary-item">
          <span>Inactive</span>
          <strong>{inactiveStudents}</strong>
        </div>
      </section>

      <section className="records-section">
        <div className="section-heading">
          <h2>All students</h2>
          <span>{students.length} records</span>
        </div>
        {students.length > 0 ? (
          <StudentTable
            students={students}
            onEdit={(student) => setModal({ type: "edit", student })}
            onDelete={(student) => setModal({ type: "delete", student })}
          />
        ) : (
          <div className="empty-state">
            <p className="eyebrow">NO RECORDS</p>
            <h2>No student records yet</h2>
            <p>Add a student to start building your register.</p>
            <button className="btn primary" onClick={() => setModal({ type: "add" })}>
              <span aria-hidden="true">+</span> Add first student
            </button>
          </div>
        )}
      </section>

      {modal.type === "add" && (
        <StudentFormModal
          mode="add"
          initialValues={{}}
          students={students}
          onSubmit={handleAdd}
          onClose={closeModal}
        />
      )}

      {modal.type === "edit" && (
        <StudentFormModal
          mode="edit"
          initialValues={{ ...modal.student, age: String(modal.student.age) }}
          students={students}
          onSubmit={handleEdit}
          onClose={closeModal}
        />
      )}

      {modal.type === "delete" && (
        <DeleteConfirmModal
          student={modal.student}
          onConfirm={handleDelete}
          onClose={closeModal}
        />
      )}
    </main>
  );
}

export default App;
