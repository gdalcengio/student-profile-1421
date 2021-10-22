import "./Tags.css";

//expects tags
function Tags(props) {
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
