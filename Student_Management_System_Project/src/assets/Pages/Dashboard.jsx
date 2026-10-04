import React from "react";
import { Link } from "react-router-dom";

import { useStudentContext } from "../context/StudentContext";

import { getAttendance } from "../utils/attendanceStorage";
import { getResults } from "../utils/resultStorage";

const Dashboard = () => {
  const { students } = useStudentContext();

  const attendance = getAttendance();
  const results = getResults();

  // Student statistics
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  // Attendance statistics
  const totalAttendance = attendance.length;

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  // Result statistics
  const totalResults = results.length;

  const passedResults = results.filter(
    (result) => result.grade !== "F"
  ).length;

  const failedResults = results.filter(
    (result) => result.grade === "F"
  ).length;

  // Recent students
  const recentStudents = [...students]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  return (
    <div>
      {/* Dashboard Header */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome to Student Management System
          </p>
        </div>

        <Link to="/students/add">
          <button className="primary-btn">
            + Add Student
          </button>
        </Link>
      </div>

      {/* Student Statistics */}

      <h2 className="dashboard-section-title">
        Student Overview
      </h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div>
            <h3>Total Students</h3>
            <h2>{totalStudents}</h2>
          </div>

          <span>👨‍🎓</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Active Students</h3>
            <h2>{activeStudents}</h2>
          </div>

          <span>✅</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Inactive Students</h3>
            <h2>{inactiveStudents}</h2>
          </div>

          <span>⏸️</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Total Courses</h3>
            <h2>{totalCourses}</h2>
          </div>

          <span>📚</span>
        </div>

      </div>

      {/* Attendance Statistics */}

      <h2 className="dashboard-section-title">
        Attendance Overview
      </h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div>
            <h3>Total Records</h3>
            <h2>{totalAttendance}</h2>
          </div>

          <span>📊</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Present</h3>
            <h2>{presentCount}</h2>
          </div>

          <span>🟢</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Absent</h3>
            <h2>{absentCount}</h2>
          </div>

          <span>🔴</span>
        </div>

      </div>

      {/* Results Statistics */}

      <h2 className="dashboard-section-title">
        Results Overview
      </h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div>
            <h3>Total Results</h3>
            <h2>{totalResults}</h2>
          </div>

          <span>📝</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Passed</h3>
            <h2>{passedResults}</h2>
          </div>

          <span>✅</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Failed</h3>
            <h2>{failedResults}</h2>
          </div>

          <span>❌</span>
        </div>

      </div>

      {/* Recent Students */}

      <div className="recent-section">

        <div className="section-header">

          <div>
            <h2>Recent Students</h2>

            <p>
              Recently added students
            </p>
          </div>

          <Link to="/students">
            View All
          </Link>

        </div>

        <div className="table-container">

          <table className="student-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {recentStudents.length > 0 ? (
                recentStudents.map((student) => (
                  <tr key={student.id}>

                    <td>{student.id}</td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.course}</td>

                    <td>
                      <span
                        className={
                          student.status === "Active"
                            ? "status-badge active"
                            : "status-badge inactive"
                        }
                      >
                        {student.status === "Active"
                          ? "🟢 Active"
                          : "🔴 Inactive"}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/students/${student.id}`}
                      >
                        <button
                          type="button"
                          className="primary-btn"
                        >
                          View
                        </button>
                      </Link>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    No students available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;