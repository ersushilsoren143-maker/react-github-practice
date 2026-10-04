import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-number">404</div>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="primary-btn">
            🏠 Go to Dashboard
          </Link>

          <Link to="/students" className="secondary-btn">
            👨‍🎓 View Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;