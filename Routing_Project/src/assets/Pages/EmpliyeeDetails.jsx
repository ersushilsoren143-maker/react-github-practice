import React from 'react'
import { useParams } from 'react-router-dom'

const EmpliyeeDetails = () => {
    const para=useParams();
  return (
   <>
        <h1>EmployeeId :{para.id}</h1>
   </>
  )
}

export default EmpliyeeDetails