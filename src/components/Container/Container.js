import React from "react";

import "./Container.css";

function Container(props) {
  const { children, className, ...other } = props;

  return (
    <nav className={["kamina-container", className].join(" ")} {...other}>
      {props.children}
    </nav>
  );
}

export default Container;
 