
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStudents } from "../utils/studentStorage";
import { useStudentContext } from "../context/StudentContext";

const AddStudent = () => {
  const navigate = useNavigate();
  const { addNewStudent } = useStudentContext();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = student.name.trim();
    const email = student.email.trim().toLowerCase();
    const course = student.course.trim();
    const age = Number(student.age);

    // Validate age
    if (!Number.isFinite(age) || age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    // Get existing students
    const students = getStudents();

    // Check duplicate email
    const emailExists = students.some(
      (item) => item.email?.trim().toLowerCase() === email
    );

    if (emailExists) {
      alert("A student with this email already exists!");
      return;
    }

    // Create new student
    const newStudent = {
      id: Date.now(),
      name,
      email,
      course,
      age,
      status: student.status,
    };

    // Update Context and localStorage
    addNewStudent(newStudent);

    alert("Student added successfully!");

    navigate("/students");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Add Student</h1>
          <p>Add a new student to the system</p>
        </div>

        <Link to="/students" className="secondary-btn">
          ← Back to Students
        </Link>
      </div>

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

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              Add Student
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

export default AddStudent;