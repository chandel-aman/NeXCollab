import { useNavigate } from "react-router";

import Button from "../UI/Button/Button";
import classes from "./NavLinks.module.css";

const NavLinks = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.navlinks}>
      <Button className="dark" onClick={()=>navigate("/login")}>
        LOGIN
      </Button>

      <Button className="light" onClick={()=>navigate("/signup")}>
        SIGNUP
      </Button>
    </div>
  );
};

export default NavLinks;
