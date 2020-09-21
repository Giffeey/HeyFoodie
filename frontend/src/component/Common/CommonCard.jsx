import React from "react";

export default function CommonCard(props) {
  return (
    <div className="card" style={{ width: "100%" }}>
      {props.header && <div className="card-header">{props.header}</div>}
      <div className="card-body">{props.children}</div>
    </div>
  );
}
