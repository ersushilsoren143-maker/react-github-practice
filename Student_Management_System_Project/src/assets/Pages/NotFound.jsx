import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>

      <h1 style={{ fontSize: "80px", margin: "0" }}>
        404
      </h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/">
        <button className="primary-btn">
          ← Go to Dashboard
        </button>
      </Link>

    </div>
  );
};

export default NotFound;