import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Students from "../CollagePage/Students";

const Collage = () => {
   const navigate= useNavigate();
  return (
    <>
     
    <h1>Collage Page</h1>

      <Link to="student">Student</Link>

      <Outlet />

      <button onClick={()=>navigate("/home")}>Go to Home Page</button>

    </>
  );
};

export default Collage;
