function Student(props) {
  //setting up unique id for testing
  const nameId = `name${props.student.id}`;
  const emailId = `email${props.student.id}`;
  const companyId = `company${props.student.id}`;
  const skillId = `skill${props.student.id}`;
  const averageId = `average${props.student.id}`;

  //gets average to display
  const grades = props.student.grades.map((grade) => Number(grade));
  // console.log("grades: " + grades);
  const average = grades.reduce((total, val) => total + val) / grades.length;
  // console.log("average: " + average);

  return (
    <div className="student">
      <img src={props.student.pic} alt="profile of user" />
      <h1 id={nameId}>
        {props.student.firstName} {props.student.lastName}
      </h1>
      <p id={emailId}>Email: {props.student.email}</p>
      <p id={companyId}>Company: {props.student.company}</p>
      <p id={skillId}>Skill: {props.student.skill}</p>
      <p id={averageId}>Average: {average}%</p>
    </div>
  );
}

export default Student;
