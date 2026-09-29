import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Employees = () => {
  return (
   <>
      <h2>Employee Pages</h2>
      <Link to="profile">Profile</Link>
      <Link to="setting">Setting</Link>
      <Outlet></Outlet>
   </>
  )
}

export default Employees