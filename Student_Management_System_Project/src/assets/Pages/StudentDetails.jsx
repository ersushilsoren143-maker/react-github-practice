
import React from "react";
import { Link, useParams } from "react-router-dom";

import { useStudentContext } from "../context/StudentContext";

const StudentDetails = () => {
  const { id } = useParams();

  const { students } = useStudentContext();

  // Find student
  const student = students.find(
    (item) => String(item.id) === id
  );

  // Student not found
  if (!student) {
    return (
      <div className="details-not-found">
        <div className="details-not-found-card">
          <div className="details-not-found-icon">🔍</div>

          <h2>Student Not Found</h2>

          <p>
            The student you are looking for does not exist
            or may have been deleted.
          </p>

          <Link to="/students" className="primary-btn">
            ← Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Student Details</h1>
          <p>View complete student information</p>
        </div>

        <Link to="/students" className="secondary-btn">
          ← Back to Students
        </Link>
      </div>

      {/* Student Profile */}
      <div className="student-details-card">

        {/* Profile Header */}
        <div className="student-profile-header">
          <div className="student-avatar">
            {student.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{student.name}</h2>
            <p>{student.email}</p>
          </div>
        </div>

        {/* Student Information */}
        <div className="student-info-grid">

          <div className="student-info-item">
            <span>Student ID</span>
            <strong>{student.id}</strong>
          </div>

          <div className="student-info-item">
            <span>Student Name</span>
            <strong>{student.name}</strong>
          </div>

          <div className="student-info-item">
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div className="student-info-item">
            <span>Course</span>
            <strong>{student.course}</strong>
          </div>

          <div className="student-info-item">
            <span>Age</span>
            <strong>{student.age} years</strong>
          </div>

          <div className="student-info-item">
            <span>Status</span>

            <strong>
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
            </strong>
          </div>

        </div>

        {/* Actions */}
        <div className="student-details-actions">

          <Link
            to={`/students/edit/${student.id}`}
            className="edit-btn"
          >
            ✏️ Edit Student
          </Link>

          <Link
            to="/students"
            className="secondary-btn"
          >
            ← Back
          </Link>

        </div>
      </div>
    </div>
  );
};
export default StudentDetails
