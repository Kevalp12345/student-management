import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentTable from "./components/StudentTable";
import StudentForm from "./pages/studentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
