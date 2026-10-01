
import React from "react";
import { Link } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";

const Dashboard = () => {
  const { students } = useStudentContext();

  // Total students
  const totalStudents = students.length;

  // Active students
  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  // Inactive students
  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  // Total unique courses
  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  // Latest 5 students
  const recentStudents = [...students]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  return (
    <div>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to Student Management System</p>
        </div>

        <Link to="/students/add">
          <button className="primary-btn">+ Add Student</button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-cards">

        {/* Total Students */}
        <div className="dashboard-card">
          <div>
            <h3>Total Students</h3>
            <h2>{totalStudents}</h2>
          </div>

          <span>👨‍🎓</span>
        </div>

        {/* Active Students */}
        <div className="dashboard-card">
          <div>
            <h3>Active Students</h3>
            <h2>{activeStudents}</h2>
          </div>

          <span>✅</span>
        </div>

        {/* Inactive Students */}
        <div className="dashboard-card">
          <div>
            <h3>Inactive Students</h3>
            <h2>{inactiveStudents}</h2>
          </div>

          <span>⏸️</span>
        </div>

        {/* Total Courses */}
        <div className="dashboard-card">
          <div>
            <h3>Total Courses</h3>
            <h2>{totalCourses}</h2>
          </div>

          <span>📚</span>
        </div>

      </div>

      {/* Recent Students */}
      <div className="recent-section">

        <div className="section-header">
          <div>
            <h2>Recent Students</h2>
            <p>Recently added students</p>
          </div>

          <Link to="/students">View All</Link>
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
                      <Link to={`/students/${student.id}`}>
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
                  <td colSpan="6" style={{ textAlign: "center" }}>
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

