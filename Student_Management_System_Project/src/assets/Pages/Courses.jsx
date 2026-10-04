import React, { useState } from "react";

import {
  getCourses,
  addCourse,
  deleteCourse,
} from "../utils/courseStorage";

const Courses = () => {
  const [courses, setCourses] = useState(() => getCourses());
  const [courseName, setCourseName] = useState("");

  const handleAddCourse = (e) => {
    e.preventDefault();

    const name = courseName.trim();

    if (!name) {
      alert("Please enter a course name.");
      return;
    }

    const courseExists = courses.some(
      (course) =>
        course.name.toLowerCase() === name.toLowerCase()
    );

    if (courseExists) {
      alert("This course already exists!");
      return;
    }

    const newCourse = {
      id: Date.now(),
      name,
    };

    const updatedCourses = addCourse(newCourse);

    setCourses(updatedCourses);
    setCourseName("");

    alert("Course added successfully!");
  };

  const handleDeleteCourse = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    const updatedCourses = deleteCourse(id);

    setCourses(updatedCourses);

    alert("Course deleted successfully!");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Courses</h1>
          <p>Manage all available courses</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div>
            <h3>Total Courses</h3>
            <h2>{courses.length}</h2>
          </div>

          <span>📚</span>
        </div>
      </div>

      <div className="form-container">
        <h2>Add New Course</h2>

        <form onSubmit={handleAddCourse}>
          <div className="form-group">
            <label htmlFor="courseName">
              Course Name
            </label>

            <input
              id="courseName"
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) =>
                setCourseName(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            + Add Course
          </button>
        </form>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <div>
            <h2>Course List</h2>
            <p>All available courses</p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>

            <h2>No Courses Found</h2>

            <p>
              Add your first course using the form above.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>

                    <td>{course.name}</td>

                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteCourse(course.id)
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

export default Courses;