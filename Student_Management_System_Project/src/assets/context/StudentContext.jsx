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

import {
  deleteAttendanceByStudentId,
} from "../utils/attendanceStorage";

import {
  deleteResultsByStudentId,
} from "../utils/resultStorage";

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
    // Delete student
    const updatedStudents = deleteStudent(id);

    // Delete related attendance records
    deleteAttendanceByStudentId(id);

    // Delete related result records
    deleteResultsByStudentId(id);

    // Update students state
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