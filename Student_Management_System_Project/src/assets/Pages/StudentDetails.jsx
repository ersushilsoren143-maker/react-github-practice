import React from "react";
import { Link, useParams } from "react-router-dom";

import { useStudentContext } from "../context/StudentContext";

const StudentDetails = () => {
  const { id } = useParams();

  const { students } = useStudentContext();

  // Find student from Context
  const student = students.find(
    (item) => item.id === Number(id)
  );

  // Student not found
  if (!student) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h2>Student Not Found</h2>

        <p>
          The student you are looking for does not exist.
        </p>

        <Link to="/students">
          <button className="primary-btn">
            ← Back to Students
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Student Details</h1>
          <p>View student information</p>
        </div>

        <Link to="/students">
          <button className="secondary-btn">
            ← Back to Students
          </button>
        </Link>
      </div>

      {/* Student Details */}
      <div className="form-container">

        {/* ID */}
        <div className="form-group">
          <label>Student ID</label>

          <input
            type="text"
            value={student.id}
            readOnly
          />
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Student Name</label>

          <input
            type="text"
            value={student.name}
            readOnly
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>

          <input
            type="text"
            value={student.email}
            readOnly
          />
        </div>

        {/* Course */}
        <div className="form-group">
          <label>Course</label>

          <input
            type="text"
            value={student.course}
            readOnly
          />
        </div>

        {/* Age */}
        <div className="form-group">
          <label>Age</label>

          <input
            type="text"
            value={student.age}
            readOnly
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>

          <input
            type="text"
            value={student.status}
            readOnly
          />
        </div>

        {/* Actions */}
        <div className="form-actions">

          <Link to={`/students/edit/${student.id}`}>
            <button className="edit-btn">
              Edit Student
            </button>
          </Link>

          <Link to="/students">
            <button className="secondary-btn">
              Back
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default StudentDetails;