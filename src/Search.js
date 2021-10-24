import { useState, useEffect } from "react";

import "./Search.css";

function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");

  function handleSearch() {
    //get data
    // const query = event.target.value.toLowerCase().trim();
    let students = props.students;

    //filter data by name query
    const searchRegex = new RegExp(searchQuery, "i");
    students = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`;
      return fullName.search(searchRegex) !== -1;
    });

    //filter data by tag
    if (tagQuery !== "") {
      //filter all without a tag
      students = students.filter((student) => {
        return student.tags;
      });

      //filter within tags
      const tagRegex = new RegExp(tagQuery, "i");
      students = students.filter((student) => {
        let hasTag = false;
        for (let i = 0; i < student.tags.length; ++i) {
          if (student.tags[i].search(tagRegex) !== -1) {
            hasTag = true;
          }
        }

        return hasTag;
      });
    }

    //set students array
    return props.setStudents(students);
  }

  function handleName(event) {
    setSearchQuery(event.target.value.toLowerCase().trim());
  }

  function handleTag(event) {
    setTagQuery(event.target.value.toLowerCase().trim());
  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery, tagQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        className="search-bar"
        onChange={(event) => handleName(event)}
      />
      <input
        type="text"
        placeholder="Search by tag"
        className="search-bar"
        onChange={(event) => handleTag(event)}
      />
    </div>
  );
}

export default Search;
