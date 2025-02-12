import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentTable = () => {
  const navigate = useNavigate();
  const students = useSelector((state) => state.students);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 vw-100"
      style={{ gap: "20px" }}
    >
      <h2 className="text-primary">📚 Student Records</h2>
      <button
        className="btn btn-success d-flex align-items-center"
        onClick={() => navigate("/add")}
      >
        <FaPlus className="me-2" /> Add Student
      </button>

      <div className="table-responsive shadow-lg p-3 bg-white rounded">
        <table className="table table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="align-middle">
                  <td className="fw-bold">{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.grade}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/edit/${student.id}`)}
                    >
                      <FaEdit className="me-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
