import { useState, useEffect } from "react";
import "./App.css";

import Student from "./Student";

function App() {
  const [studentData, setStudentData] = useState(null);

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

  useEffect(() => {
    fetchStudentData();
  }, []);

  if (!studentData) {
    return "loading...";
  }

  return (
    // app container helps with border-radius/overflow conflict
    <div className="app-container">
      <div className="student-list">
        {studentData.students.map((student, index) => (
          <Student key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default App;
