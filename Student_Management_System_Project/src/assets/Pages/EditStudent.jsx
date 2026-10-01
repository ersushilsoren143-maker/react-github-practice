
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useStudentContext } from "../context/StudentContext";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    students,
    updateExistingStudent,
  } = useStudentContext();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [studentFound, setStudentFound] = useState(false);

  // Find student by ID
  useEffect(() => {
    const existingStudent = students.find(
      (item) => String(item.id) === id
    );

    if (existingStudent) {
      setStudent({
        name: existingStudent.name ?? "",
        email: existingStudent.email ?? "",
        course: existingStudent.course ?? "",
        age: existingStudent.age ?? "",
        status: existingStudent.status ?? "Active",
      });

      setStudentFound(true);
    } else {
      setStudentFound(false);
    }

    setLoading(false);
  }, [id, students]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((previousStudent) => ({
      ...previousStudent,
      [name]: value,
    }));
  };

  // Submit updated student
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = student.name.trim();
    const email = student.email.trim().toLowerCase();
    const course = student.course.trim();
    const age = Number(student.age);

    // Validate age
    if (!Number.isInteger(age) || age <= 0) {
      alert("Please enter a valid positive whole-number age.");
      return;
    }

    // Check duplicate email, excluding current student
    const emailExists = students.some(
      (item) =>
        String(item.id) !== id &&
        item.email?.trim().toLowerCase() === email
    );

    if (emailExists) {
      alert("Another student is already using this email!");
      return;
    }

    // Prepare updated student
    const updatedStudent = {
      id: Number(id),
      name,
      email,
      course,
      age,
      status: student.status,
    };

    // Update Context and localStorage
    updateExistingStudent(updatedStudent);

    alert("Student updated successfully!");

    navigate("/students");
  };

  // Loading state
  if (loading) {
    return <h2>Loading student details...</h2>;
  }

  // Student not found
  if (!studentFound) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Student Not Found</h2>

        <Link to="/students" className="secondary-btn">
          ← Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Edit Student</h1>
          <p>Update student information</p>
        </div>

        <Link to="/students" className="secondary-btn">
          ← Back to Students
        </Link>
      </div>

      {/* Edit Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter student name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              type="text"
              name="course"
              placeholder="Enter course"
              value={student.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              min="1"
              step="1"
              placeholder="Enter age"
              value={student.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={student.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Form Buttons */}
          <div className="form-actions">
            <button type="submit" className="primary-btn">
              Update Student
            </button>

            <Link to="/students" className="secondary-btn">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;