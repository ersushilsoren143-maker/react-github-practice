const STORAGE_KEY = "students";

// Get all students
export const getStudents = () => {
  const savedStudents = localStorage.getItem(STORAGE_KEY);

  return savedStudents
    ? JSON.parse(savedStudents)
    : [];
};


// Save all students
export const saveStudents = (students) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students)
  );
};


// Add student
export const addStudent = (student) => {
  const students = getStudents();

  const updatedStudents = [
    ...students,
    student,
  ];

  saveStudents(updatedStudents);

  return updatedStudents;
};


// Update student
export const updateStudent = (updatedStudent) => {
  const students = getStudents();

  const updatedStudents = students.map((student) =>
    student.id === updatedStudent.id
      ? updatedStudent
      : student
  );

  saveStudents(updatedStudents);

  return updatedStudents;
};


// Delete student
export const deleteStudent = (id) => {
  const students = getStudents();

  const updatedStudents = students.filter(
    (student) => student.id !== id
  );

  saveStudents(updatedStudents);

  return updatedStudents;
};