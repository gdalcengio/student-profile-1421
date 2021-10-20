// import { render } from "react-dom";
import "./Search.css";

function Search(props) {
  return (
    <input
      type="text"
      placeholder="Search by name"
      className="search-bar"
      onChange={(event) => props.handleSearch(event)}
    />
  );
}

export default Search;
