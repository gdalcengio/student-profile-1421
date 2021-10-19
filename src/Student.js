function Student(props) {
  //setting up unique id for testing
  const nameId = `name${props.student.id}`;
  const emailId = `email${props.student.id}`;
  const companyId = `company${props.student.id}`;
  const skillId = `skill${props.student.id}`;
  return (
    <div className="student">
      <img src={props.student.pic} alt="profile of user" />
      <h1 id={nameId}>
        {props.student.firstName} {props.student.lastName}
      </h1>
      <p id={emailId}>Email: {props.student.email}</p>
      <p id={companyId}>Company: {props.student.company}</p>
      <p id={skillId}>Skill: {props.student.skill}</p>
      <p>Average: {props.average}</p>
    </div>
  );
}

export default Student;
