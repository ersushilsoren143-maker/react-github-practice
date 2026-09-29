import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
  Link,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Home</h2>
      <button onClick={() => navigate("/about")}>Go to About </button>
    </>
  );
}

function About() {
  const navigate=useNavigate();
  return (
    <>
      <h2>About</h2>
      <button onClick={()=>navigate("/home")}>Go to Home</button>
    </>
  );
}

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
        {/* <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink> */}

        {/* <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter> */}
    


<BrowserRouter>
<Link to="/course/java">Java</Link>
<Link to="/course/JavaScript">JavaScript</Link>
<Link to="/course/HTML">HTML</Link>
<Link to="/course/React">React</Link>

    <Routes>
      <Route path="/course/:name"element={<Courses/>}></Route>
    </Routes>
</BrowserRouter>
</>
  );
}

export default App;

function Courses(){
  const {name}=useParams();
  return (
    <>
    <h2>Welcome to {name} Course</h2>
    </>
  )
}
