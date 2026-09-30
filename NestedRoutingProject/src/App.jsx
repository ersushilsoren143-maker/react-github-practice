 import "./App.css";
 import {BrowserRouter, Link, Outlet, Route, Routes} from 'react-router-dom'
import Home from "./assets/Pages/Home";
import Login from "./assets/Pages/Login";
import About from "./assets/Pages/About";
import Collage from "./assets/Pages/Collage";
import Navbar from "./assets/Navbar/Navbar";
import Students from "./assets/CollagePage/Students";

function App() {
  return <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/collage" element={<Collage></Collage>}>
           
          <Route path="student" element={<Students/>}></Route>
         
      </Route>
     </Routes>
     
     </BrowserRouter>
  </>
}
export default App;
