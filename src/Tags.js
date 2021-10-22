import "./Tags.css";

//expects tags
function Tags(props) {
  if (props.tags < 1) {
    return "";
  }

  const items = props.tags.map((tag) => {
    return (
      <li key={tag} className="tag">
        {tag}
      </li>
    );
  });

  return <ul className="tag-list">{items}</ul>;
}

export default Tags;
