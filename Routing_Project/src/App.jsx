import './App.css'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './assets/Pages/Home'
import About from './assets/Pages/About'
import Contact from './assets/Pages/Contact'
import NotFound from './assets/Pages/NotFound'
import Employees from './assets/Pages/Employees'
import NavBar from './assets/Components/NavBar'
import EmpliyeeDetails from './assets/Pages/EmpliyeeDetails'
import Profile from './assets/Pages/Profile'
import Setting from './assets/Pages/Setting'
function App() {
  

  return (
    
      <>

        <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/employee' element={<Employees></Employees>}>
          
              <Route path='profile' element={<Profile></Profile>}></Route>
              <Route path='setting' element={<Setting></Setting>}></Route>
          </Route>
          <Route path='/employee/:id'element={<EmpliyeeDetails></EmpliyeeDetails>}></Route>
          <Route path='/*' element={<NotFound></NotFound>}></Route>
        </Routes>
        </BrowserRouter>  
      </>
  )
}

export default App
