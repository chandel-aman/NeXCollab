import "./icons.css";

const Broom = (props) => {
  const { onClick, wobble, onAnimationEnd } = props;
  return (
    <div
      className={`svg-icons broom ${wobble ? "active" : ""}`}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
      >
        <defs>
          <linearGradient
            id="a"
            x1="15.474"
            x2="52.72"
            y1="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#8526fe"></stop>
            <stop offset=".375" stop-color="#dc9dfc"></stop>
            <stop offset=".69" stop-color="#0080ff"></stop>
            <stop offset="1" stop-color="#5fe4d4"></stop>
          </linearGradient>
          <linearGradient
            id="b"
            x1="15.474"
            x2="52.72"
            y1="45"
            y2="45"
          ></linearGradient>
        </defs>
        <path
          fill="url(#a)"
          d="M36,40V37a1,1,0,0,0-1-1V5a3,3,0,0,0-6,0V36a1,1,0,0,0-1,1v3a7.008,7.008,0,0,0-7,7V61a1,1,0,0,0,1,1H42a1,1,0,0,0,1-1V47A7.008,7.008,0,0,0,36,40ZM31,5a1,1,0,0,1,2,0V36H31ZM30,38h4v2H30Zm-2,4h8a5.006,5.006,0,0,1,5,5H23A5.006,5.006,0,0,1,28,42ZM39,60V51H37v9H36V51H34v9H33V51H31v9H30V51H28v9H27V51H25v9H23V49H41V60Z"
        ></path>
        <rect width="4" height="2" x="25" y="44" fill="url(#b)"></rect>
        <rect width="2" height="2" x="30" y="44" fill="url(#b)"></rect>
      </svg>
    </div>
  );
};

export default Broom;
