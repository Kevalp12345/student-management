import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../features/student/studentSlice";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { emojiRegex } from "../common";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const students = useSelector((state) => state.students);

  const existingStudent = students.find((s) => s.id === parseInt(id));

  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    age: Yup.number()
      .required("Age is required.")
      .min(1, "Age must be a positive number.")
      .typeError("Age is required."),
    grade: Yup.string().required("Grade is required"),
  });

  const validate = async (name, value) => {
    try {
      await validationSchema.validateAt(name, {
        ...studentData,
        [name]: value,
      });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: err.message,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value?.replace(emojiRegex, "") });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(studentData, { abortEarly: false });
      setErrors({});

      if (existingStudent) {
        dispatch(updateStudent({ id: existingStudent.id, ...studentData }));
      } else {
        dispatch(addStudent(studentData));
      }
      navigate("/");
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (existingStudent) {
      setStudentData(existingStudent);
    }
  }, [existingStudent]);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 vw-100">
      <h2>{existingStudent ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={studentData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Age *</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={studentData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Grade *</label>
          <select
            className="form-control"
            name="grade"
            value={studentData.grade}
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          {errors.grade && <div className="text-danger">{errors.grade}</div>}
        </div>
        <button type="submit" className="btn btn-success">
          {existingStudent ? "Update" : "Add"} Student
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
