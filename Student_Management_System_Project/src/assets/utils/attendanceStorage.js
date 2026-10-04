const STORAGE_KEY = "attendance";

// Get all attendance records
export const getAttendance = () => {
  const savedAttendance =
    localStorage.getItem(STORAGE_KEY);

  return savedAttendance
    ? JSON.parse(savedAttendance)
    : [];
};

// Save attendance records
export const saveAttendance = (attendance) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(attendance)
  );
};

// Add attendance record
export const addAttendance = (record) => {
  const attendance = getAttendance();

  const updatedAttendance = [
    ...attendance,
    record,
  ];

  saveAttendance(updatedAttendance);

  return updatedAttendance;
};

// Update attendance record
export const updateAttendance = (updatedRecord) => {
  const attendance = getAttendance();

  const updatedAttendance = attendance.map(
    (record) =>
      record.id === updatedRecord.id
        ? updatedRecord
        : record
  );

  saveAttendance(updatedAttendance);

  return updatedAttendance;
};

// Delete attendance record
export const deleteAttendance = (id) => {
  const attendance = getAttendance();

  const updatedAttendance = attendance.filter(
    (record) => record.id !== id
  );

  saveAttendance(updatedAttendance);

  return updatedAttendance;
};

// Delete all attendance records of a student
export const deleteAttendanceByStudentId = (
  studentId
) => {
  const attendance = getAttendance();

  const updatedAttendance = attendance.filter(
    (record) =>
      String(record.studentId) !==
      String(studentId)
  );

  saveAttendance(updatedAttendance);

  return updatedAttendance;
};