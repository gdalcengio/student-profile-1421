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

  function setTag(string, i) {
    const newStudents = studentData.students.map((student) => {
      if (student.id === i) {
        //check if tag array and tag exists then create if not
        if (student.tags) {
          if (!student.tags.includes(string)) {
            student.tags.push(string);
          }
        } else {
          student.tags = [string];
        }
      }
      return student;
    });

    //set new students with tag to re-render
    setStudents(newStudents);
  }

  if (!studentData) {
    return (
      <div className="app-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Search students={studentData.students} setStudents={setStudents} />
      <div className="student-list">
        {students.map((student) => (
          <Student key={student.id} student={student} setTag={setTag} />
        ))}
      </div>
    </div>
  );
}

export default App;
