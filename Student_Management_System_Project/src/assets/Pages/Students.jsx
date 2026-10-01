
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStudentContext } from "../context/StudentContext";

const Students = () => {
  const { students, removeStudent } = useStudentContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Delete Student
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    removeStudent(id);

    alert("Student deleted successfully!");
  };

  // Search + Status Filter
  const filteredStudents = students.filter((student) => {
    const name = student.name?.toLowerCase() || "";
    const email = student.email?.toLowerCase() || "";
    const course = student.course?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    const matchesSearch =
      name.includes(searchText) ||
      email.includes(searchText) ||
      course.includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage all registered students</p>
        </div>

        <Link to="/students/add">
          <button className="primary-btn">+ Add Student</button>
        </Link>
      </div>

      {/* Search + Status Filter */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          className="search-box"
          placeholder="Search by name, email or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="search-box"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* No Students */}
      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👨‍🎓</div>

          <h2>No Students Found</h2>

          <p>
            There are no students available. Add your first student
            to get started.
          </p>

          <Link to="/students/add">
            <button className="primary-btn">
              + Add Student
            </button>
          </Link>
        </div>
      ) : filteredStudents.length === 0 ? (
        /* No Search Result */
        <div className="empty-state">
          <div className="empty-icon">🔍</div>

          <h2>No Matching Students</h2>

          <p>
            Try changing your search or status filter.
          </p>
        </div>
      ) : (
        /* Student Table */
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Age</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>

                  <td>{student.name}</td>

                  <td>{student.email}</td>

                  <td>{student.course}</td>

                  <td>{student.age}</td>

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
                    {/* View */}
                    <Link to={`/students/${student.id}`}>
                      <button
                        type="button"
                        className="primary-btn"
                      >
                        View
                      </button>
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/students/edit/${student.id}`}
                    >
                      <button
                        type="button"
                        className="edit-btn"
                      >
                        Edit
                      </button>
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(student.id)
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
  );
};
export default Students;