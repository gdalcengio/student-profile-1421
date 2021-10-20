import { useState, useEffect } from "react";
import "./App.css";

import Student from "./Student";
import Search from "./Search";

function App() {
  const [studentData, setStudentData] = useState(null);
  const [students, setStudents] = useState([]);

  async function fetchStudentData() {
    try {
      const response = await fetch(
        "https://api.hatchways.io/assessment/students"
      );
      setStudentData(await response.json());
    } catch (e) {
      return null;
    }
  }

  //on load or component change
  useEffect(() => {
    fetchStudentData();
  }, []);

  //on studentData change, set students
  useEffect(() => {
    if (studentData) {
      setStudents(studentData.students);
    }
  }, [studentData]);

  if (!studentData) {
    return (
      <div className="app-container">
        <div className="student-list">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Search students={studentData.students} setStudents={setStudents} />
      <div className="student-list">
        {students.map((student, index) => (
          <Student key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default App;
