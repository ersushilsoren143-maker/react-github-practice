import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Student Management System</h2>
      </div>

      <div className="navbar-right">
        <div className="admin-info">
          <div className="admin-avatar">A</div>
       
      
       <div>
        <h4>Admin</h4>
        <span>Administrator</span>
       </div>
       </div>
     
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
