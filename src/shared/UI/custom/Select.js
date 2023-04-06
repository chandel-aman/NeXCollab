import { useState, useRef } from "react";

import Code from "../../icons/Code";
import languages from "../../constants/languages";

import classes from "./select.module.css";

const Select = (props) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const logoRef = useRef();

  const toggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
    props.onLangChange(index);
    console.log(languages[index]);
    // languages[index].logo.className
  };

  const handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setSelectedThenCloseDropdown(index);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : languages.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedOption(
          selectedOption == languages.length - 1 ? 0 : selectedOption + 1
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes["select-container"]}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        className={isOptionsOpen ? "expanded" : ""}
        onClick={toggleOptions}
        onKeyDown={handleListKeyDown}
      >
        {selectedOption >= 0 ? (
          languages[selectedOption].logo
        ) : (
          <Code active={isOptionsOpen} />
        )}
      </button>
      <ul
        className={`${classes.options} ${isOptionsOpen ? classes.show : ""}`}
        role="listbox"
        aria-activedescendant={languages[selectedOption]}
        tabIndex={-1}
        onKeyDown={handleListKeyDown}
      >
        {languages.map((lang, index) => (
          <li
            key={lang.value}
            id={lang.ext}
            role={lang.name}
            aria-selected={selectedOption == index}
            tabIndex={0}
            onKeyDown={handleKeyDown(index)}
            onClick={() => {
              setSelectedThenCloseDropdown(index);
            }}
          >
            {lang.logo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
