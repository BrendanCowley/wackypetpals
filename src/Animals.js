import React, { Component } from "react";
import "./profile.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
const Animals = props => (
  <div>
    {props.kids.filter(item => item.type == props.type).map(item => (
      <div>
        <div className="Border">
          <img src={item.picture} className="Pic" />
          <p>
            name: {item.name}, age: {item.age}, type: {item.type}
          </p>
        </div>
        <hr />
      </div>
    ))}
  </div>
);

export default Animals;
