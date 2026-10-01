import Navbar from "./assets/Components/Navbar";
import Sidebar from "./assets/Components/Sidebar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./assets/Pages/Dashboard";
import Students from "./assets/Pages/Students";
import AddStudent from "./assets/Pages/AddStudent";
import StudentDetails from "./assets/Pages/StudentDetails";
import EditStudent from "./assets/Pages/EditStudent";
import NotFound from "./assets/Pages/NotFound";

function App() {
  return (
    <div>
      <Navbar />

      <div className="main-container">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;