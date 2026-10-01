import React from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <h2>SMS</h2>
        <span>Student Management</span>
      </div>
      <nav className="sidebar-menu">
        <span>🏠</span>
        Dashboard
        <NavLink />
        <NavLink to="/students">
          <span>👨‍🎓</span>
          Students
        </NavLink>
        <NavLink to="/students/add">
          <span>➕</span>
          Add Student
        </NavLink>
        <NavLink to="/courses">
          <span>📚</span>
          Courses
        </NavLink>
        <NavLink to="/attendance">
          <span>📊</span>
          Attendance
        </NavLink>
        <NavLink to="/results">
          <span>📝</span>
          Results
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
