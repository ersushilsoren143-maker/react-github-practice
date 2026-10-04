import React, { useState } from "react";

import { useStudentContext } from "../context/StudentContext";

import {
  getResults,
  addResult,
  deleteResult,
} from "../utils/resultStorage";

const Results = () => {
  const { students } = useStudentContext();

  const [results, setResults] = useState(
    () => getResults()
  );

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("100");

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId) {
      alert("Please select a student.");
      return;
    }

    const subjectName = subject.trim();

    if (!subjectName) {
      alert("Please enter a subject.");
      return;
    }

    const obtainedMarks = Number(marks);
    const maximumMarks = Number(totalMarks);

    if (
      !Number.isFinite(obtainedMarks) ||
      !Number.isFinite(maximumMarks)
    ) {
      alert("Please enter valid marks.");
      return;
    }

    if (maximumMarks <= 0) {
      alert("Total marks must be greater than 0.");
      return;
    }

    if (
      obtainedMarks < 0 ||
      obtainedMarks > maximumMarks
    ) {
      alert(
        "Obtained marks cannot be greater than total marks."
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

    const alreadyExists = results.some(
      (result) =>
        String(result.studentId) === String(studentId) &&
        result.subject.toLowerCase() ===
          subjectName.toLowerCase()
    );

    if (alreadyExists) {
      alert(
        "Result for this student and subject already exists!"
      );
      return;
    }

    const percentage =
      (obtainedMarks / maximumMarks) * 100;

    const newResult = {
      id: Date.now(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      subject: subjectName,
      marks: obtainedMarks,
      totalMarks: maximumMarks,
      percentage: percentage.toFixed(2),
      grade: calculateGrade(percentage),
    };

    const updatedResults = addResult(newResult);

    setResults(updatedResults);

    setStudentId("");
    setSubject("");
    setMarks("");
    setTotalMarks("100");

    alert("Result added successfully!");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) return;

    const updatedResults = deleteResult(id);

    setResults(updatedResults);

    alert("Result deleted successfully!");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Results</h1>
          <p>Manage student academic results</p>
        </div>
      </div>

      {/* Statistics */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div>
            <h3>Total Results</h3>
            <h2>{results.length}</h2>
          </div>

          <span>📝</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Passed</h3>
            <h2>
              {
                results.filter(
                  (result) => result.grade !== "F"
                ).length
              }
            </h2>
          </div>

          <span>✅</span>
        </div>

        <div className="dashboard-card">
          <div>
            <h3>Failed</h3>
            <h2>
              {
                results.filter(
                  (result) => result.grade === "F"
                ).length
              }
            </h2>
          </div>

          <span>❌</span>
        </div>

      </div>

      {/* Add Result */}

      <div className="form-container">

        <h2>Add Result</h2>

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
            <label htmlFor="subject">
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="marks">
              Obtained Marks
            </label>

            <input
              id="marks"
              type="number"
              min="0"
              placeholder="Enter obtained marks"
              value={marks}
              onChange={(e) =>
                setMarks(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalMarks">
              Total Marks
            </label>

            <input
              id="totalMarks"
              type="number"
              min="1"
              value={totalMarks}
              onChange={(e) =>
                setTotalMarks(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            + Add Result
          </button>

        </form>

      </div>

      {/* Results Table */}

      <div className="recent-section">

        <div className="section-header">
          <div>
            <h2>Result Records</h2>
            <p>All student academic results</p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              📝
            </div>

            <h2>No Results Found</h2>

            <p>
              Add a student result using the form above.
            </p>

          </div>
        ) : (
          <div className="table-container">

            <table className="student-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {results.map((result) => (
                  <tr key={result.id}>

                    <td>{result.id}</td>

                    <td>{result.studentName}</td>

                    <td>{result.subject}</td>

                    <td>
                      {result.marks} /{" "}
                      {result.totalMarks}
                    </td>

                    <td>
                      {result.percentage}%
                    </td>

                    <td>
                      <span
                        className={
                          result.grade === "F"
                            ? "status-badge inactive"
                            : "status-badge active"
                        }
                      >
                        {result.grade}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(result.id)
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

export default Results;