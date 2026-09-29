import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
   <NavLink to="/"className={({isActive})=>isActive?"active":""}>Home</NavLink>
   <NavLink to="/about" className={({isActive})=>isActive?"active":""}>About</NavLink>
   <NavLink to="/contact" className={({isActive})=>isActive?"active":""}>Contact</NavLink>
   <NavLink to="/employee" className={({isActive})=>isActive?"active":""}>Employees</NavLink>
   
   <NavLink to="/employee/:id" className={({isActive})=>isActive?"active":""}>EmpliyeeDetails</NavLink>
   
    </>
  )
}

export default NavBar