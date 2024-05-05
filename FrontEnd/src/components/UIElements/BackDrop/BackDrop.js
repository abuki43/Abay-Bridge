import React from "react";
import ReactDOM from "react-dom";
import "./backDrop.css";
const BackDrop = (props) => {
  return ReactDOM.createPortal(
    <div className={`backdrop ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("backdrop")
  );
};

export default BackDrop;
