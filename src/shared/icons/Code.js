import "./icons.css";

const Language = (props) => {
  return (
    <div
      className={`svg-icons code ${props.active ? "active" : ""}`}
      // type={props.type}
      // aria-haspopup={aria - haspopup}
      // aria-expanded={aria - expanded}
      // onClick={onClick}
      // onKeyDown={onKeyDown}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <rect width="50" height="50" fill="none" />
        <polyline
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          points="14 15 4 24 14 34"
        />
        <polyline
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          points="34 15 46 24 34 34"
        />
        <line
          x1="30"
          x2="18"
          y1="5"
          y2="44"
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        />
      </svg>
    </div>
  );
};

export default Language;
