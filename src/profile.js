import React, { Component } from "react";
import "./profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const kids = this.props.kids
      .map(item => (
        <div key={item.name}>
          <div className="Border">
            <img src={item.picture} className="Pic" />
            <p>
              name: {item.name}, age: {item.age}, type: {item.type}
            </p>
          </div>
          <hr />
        </div>
      ))
      .slice(0, 3);

    return <div>{kids}</div>;
  }
}
