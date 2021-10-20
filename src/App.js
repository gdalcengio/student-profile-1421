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

  function handleSearch(event) {
    //get data
    const query = event.target.value.toLowerCase().trim();
    const students = studentData.students;

    //filter data
    const regex = new RegExp(query, "i");
    // console.log(regex);
    const result = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`;
      return fullName.search(regex) !== -1;
    });

    //set students array
    setStudents(result);

    // console.log(query);
    // console.log(result);
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
    return "loading...";
  }

  return (
    // app container helps with border-radius/overflow conflict
    <div className="app-container">
      <Search handleSearch={(event) => handleSearch(event)} />
      <div className="student-list">
        {students.map((student, index) => (
          <Student key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default App;
