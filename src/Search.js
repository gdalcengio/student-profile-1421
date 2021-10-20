import "./Search.css";

function Search(props) {
  function handleSearch(event) {
    //get data
    const query = event.target.value.toLowerCase().trim();
    const students = props.students;

    //filter data
    const regex = new RegExp(query, "i");
    const result = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`;
      return fullName.search(regex) !== -1;
    });

    //set students array
    props.setStudents(result);
  }

  return (
    <input
      type="text"
      placeholder="Search by name"
      className="search-bar"
      onChange={(event) => handleSearch(event)}
    />
  );
}

export default Search;
