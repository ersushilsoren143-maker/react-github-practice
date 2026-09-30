import React from 'react'
import {  NavLink } from 'react-router-dom'
import  './NavBar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/collage">Collage</NavLink>
    </nav>
  )
}

export default Navbar