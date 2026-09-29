import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
  return (

    <>
       <h3>Home</h3>
       <button onClick={()=>navigate("/employee")}> Go to Employee Page</button>
    </>
  )
}

export default Home