import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path="/ds" element={<Dashboard/>}>
           <Route path="profile" element={<Profile/>}></Route>
           <Route path="setting" element={<Setting/>}></Route>
           <Route path="*" element={<h3>404 - Page Not Found</h3>}></Route>


        </Route>
        <Route path="*" element={<h3>404 - Page Not Found</h3>}></Route>
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


function Dashboard(){
  return (
    <>
  <h2>Dasboard</h2>
  <Outlet/>
  </>
  )
  
  
}

function Profile(){
  return <h3>Profile</h3>
}

function Setting(){
  return <h3>
  Setting
  </h3>
}