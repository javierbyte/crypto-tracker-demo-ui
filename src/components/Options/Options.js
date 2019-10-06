import React from "react";

import "./Options.css";

function Options(props) {
  return (
    <div className="kamina-options">
      {props.options.map(option => (
        <div
          className={`kamina-options-el ${
            option.value === props.value ? "-active" : ""
          }`}
          key={option.value}
          onClick={props.onChange.bind(this, option.value)}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}

export default Options;
