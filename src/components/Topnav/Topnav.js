import React from "react";

import "./Topnav.css";

function Topnav(props) {
  return <nav className="kamina-topnav">
    {props.children}
  </nav>
}

export default Topnav;