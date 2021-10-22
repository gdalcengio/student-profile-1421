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

  // function setTag(string, i) {
  //   const newStudents = studentData.students.map((student, index) => {
  //     if (index === i) {
  //       student.tag.push(string);
  //     }
  //   });
  //   return i;
  // }

  if (!studentData) {
    return (
      <div className="app-container">
        <p>Loading...</p>
        {/* <div className="student-list">
        </div> */}
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
