import React, { useState } from "react";

import { useStudentContext } from "../context/StudentContext";

import {
  getAttendance,
  addAttendance,
  deleteAttendance,
} from "../utils/attendanceStorage";

const Attendance = () => {
  const { students } = useStudentContext();

  const [attendance, setAttendance] = useState(
    () => getAttendance()
  );

  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId) {
      alert("Please select a student.");
      return;
    }

    if (!date) {
      alert("Please select a date.");
      return;
    }

    const alreadyExists = attendance.some(
      (record) =>
        String(record.studentId) === String(studentId) &&
        record.date === date
    );

    if (alreadyExists) {
      alert(
        "Attendance for this student on this date already exists!"
      );
      return;
    }

    const selectedStudent = students.find(
      (student) =>
        String(student.id) === String(studentId)
    );

    if (!selectedStudent) {
      alert("Student not found.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      date,
      status,
    };

    const updatedAttendance = addAttendance(newRecord);

    setAttendance(updatedAttendance);

    setStudentId("");
    setDate("");
    setStatus("Present");

    alert("Attendance marked successfully!");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    const updatedAttendance = deleteAttendance(id);

    setAttendance(updatedAttendance);

    alert("Attendance deleted successfully!");
  };

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Manage student attendance</p>
        </div>
      </div>

      {/* Statistics */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div>
            <h3>Total Records</h3>
            <h2>{attendance.length}</h2>
          </div>

          <span>📊</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Present</h3>
            <h2>{presentCount}</h2>
          </div>

          <span>✅</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Absent</h3>
            <h2>{absentCount}</h2>
          </div>

          <span>❌</span>
        </div>

      </div>

      {/* Mark Attendance */}

      <div className="form-container">

        <h2>Mark Attendance</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="student">
              Select Student
            </label>

            <select
              id="student"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              required
            >
              <option value="">
                -- Select Student --
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name} - {student.email}
                </option>
              ))}
            </select>

          </div>

          <div className="form-group">

            <label htmlFor="attendanceDate">
              Date
            </label>

            <input
              id="attendanceDate"
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="attendanceStatus">
              Status
            </label>

            <select
              id="attendanceStatus"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Mark Attendance
          </button>

        </form>

      </div>

      {/* Attendance Table */}

      <div className="recent-section">

        <div className="section-header">

          <div>
            <h2>Attendance Records</h2>

            <p>
              All student attendance records
            </p>
          </div>

        </div>

        {attendance.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              📊
            </div>

            <h2>No Attendance Records</h2>

            <p>
              Mark attendance for a student to see
              records here.
            </p>

          </div>
        ) : (
          <div className="table-container">

            <table className="student-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {attendance.map((record) => (
                  <tr key={record.id}>

                    <td>{record.id}</td>

                    <td>
                      {record.studentName}
                    </td>

                    <td>
                      {record.date}
                    </td>

                    <td>
                      <span
                        className={
                          record.status === "Present"
                            ? "status-badge active"
                            : "status-badge inactive"
                        }
                      >
                        {record.status === "Present"
                          ? "🟢 Present"
                          : "🔴 Absent"}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(record.id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
};

export default Attendance;