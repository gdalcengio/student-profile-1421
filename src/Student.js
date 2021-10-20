import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import "./Student.css";

function Grades(props) {
  return (
    <ul className="grades">
      {props.grades.map((grade, index) => (
        <li key={index} className="test">
          Test {index + 1}: &emsp; {grade}%
        </li>
      ))}
    </ul>
  );
}

function Student(props) {
  const [display, setDisplay] = useState(false);

  //setting up unique id for testing
  // const nameId = `name${props.student.id}`;
  // const emailId = `email${props.student.id}`;
  // const companyId = `company${props.student.id}`;
  // const skillId = `skill${props.student.id}`;
  // const averageId = `average${props.student.id}`;

  //gets average to display
  const grades = props.student.grades.map((grade) => Number(grade));
  const average = grades.reduce((total, val) => total + val) / grades.length;

  function handleClick() {
    setDisplay(!display);
  }

  return (
    <div className="student">
      <img
        src={props.student.pic}
        className="student-img"
        alt="profile of user"
      />

      <div className="student-info">
        <h1 className="student-name">
          {props.student.firstName} {props.student.lastName}
        </h1>

        <div className="student-details">
          <p className="student-email">Email: {props.student.email}</p>
          <p className="student-company">Company: {props.student.company}</p>
          <p className="student-skill">Skill: {props.student.skill}</p>
          <p className="student-average">Average: {average}%</p>
        </div>
        {display ? <Grades grades={grades} /> : ""}
      </div>

      <button onClick={() => handleClick()} className="grades-button">
        {display ? (
          <RemoveRoundedIcon sx={{ fontSize: 60 }} />
        ) : (
          <AddRoundedIcon sx={{ fontSize: 60 }} />
        )}
      </button>
    </div>
  );
}

export default Student;
