import React, {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../utils/studentStorage";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    return getStudents();
  });

  // Add student
  const addNewStudent = (student) => {
    const updatedStudents = addStudent(student);

    setStudents(updatedStudents);
  };

  // Update student
  const updateExistingStudent = (student) => {
    const updatedStudents = updateStudent(student);

    setStudents(updatedStudents);
  };

  // Delete student
  const removeStudent = (id) => {
    const updatedStudents = deleteStudent(id);

    setStudents(updatedStudents);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addNewStudent,
        updateExistingStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};