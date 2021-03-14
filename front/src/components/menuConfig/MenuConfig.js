import React from "react";
import "./style.css";

export default function MenuConfig(props) {
  function whatPageIs() {
    if (props.label !== "settings") return;
    const isConfig = window.location.href.indexOf("/config") !== -1;
    return isConfig;
  }
  return (
    <div className="card">
      <div className={whatPageIs() ? "card-header activedCard" : "card-header"}>
        {props.label}
      </div>
      <div className={whatPageIs() ? "card-body activedCard" : "card-body"}>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
}
