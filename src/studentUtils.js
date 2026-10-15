export const STORAGE_KEY = "students";

export const EMPTY_FORM = {
  studentId: "",
  fullName: "",
  age: "",
  email: "",
  course: "",
  enrollmentStatus: false,
};

// Read saved records from this browser.
export const loadStudents = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    // Change old IDs to numbers.
    return parsed.map((student) => {
      const value = String(student.studentId ?? "");
      const digits = value.replace(/^S/i, "");
      return /^\d+$/.test(digits) ? { ...student, studentId: Number(digits) } : student;
    });
  } catch {
    return [];
  }
};

// Save records in this browser.
export const saveStudents = (students) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {
    // Ignore storage errors.
  }
};

export const addStudent = (students, newStudent) => [...students, newStudent];

export const editStudent = (students, studentId, updates) =>
  students.map((s) => (s.studentId === studentId ? { ...s, ...updates } : s));

export const deleteStudent = (students, studentId) =>
  students.filter((s) => s.studentId !== studentId);

export const getStatusLabel = (isActive) => (isActive ? "Active" : "Inactive");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[\p{L}\p{M}\s'-]+$/u;
const MIN_AGE = 16;

// Check the form values.
export const validateStudent = (values, students, originalId = null) => {
  const errors = {};
  const id = String(values.studentId).trim();
  const name = values.fullName.trim();
  const email = values.email.trim();
  const ageText = String(values.age).trim();

  if (!id) {
    errors.studentId = "Student ID is required.";
  } else if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) < 1) {
    errors.studentId = "Student ID must be a positive whole number.";
  } else if (
    Number(id) !== Number(originalId) &&
    students.some((student) => Number(student.studentId) === Number(id))
  ) {
    errors.studentId = "This Student ID already exists.";
  }

  if (!name) {
    errors.fullName = "Full name is required.";
  } else if (!NAME_PATTERN.test(name)) {
    errors.fullName = "Use letters, spaces, apostrophes, or hyphens only.";
  }

  if (!ageText) {
    errors.age = "Age is required.";
  } else {
    const age = Number(ageText);
    if (!Number.isInteger(age) || age < MIN_AGE) {
      errors.age = `Age must be a whole number of at least ${MIN_AGE}.`;
    }
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address (e.g. name@example.com).";
  }

  if (!values.course.trim()) errors.course = "Course is required.";

  return errors;
};

// Make a student record from the form.
export const buildStudentRecord = (values) => ({
  studentId: Number(values.studentId),
  fullName: values.fullName.trim(),
  age: Number(values.age),
  email: values.email.trim(),
  course: values.course,
  enrollmentStatus: Boolean(values.enrollmentStatus),
});
