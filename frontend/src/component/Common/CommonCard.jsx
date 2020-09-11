import React from "react";

export default function CommonCard(props) {
  return (
    <div class="card" style={{ width: "100%" }}>
      {props.header && <div class="card-header">{props.header}</div>}
      <div class="card-body">{props.children}</div>
    </div>
  );
}
