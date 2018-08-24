import React, { Component } from "react";
import "./App.css";
import Profile from "./profile.js";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://www.demilked.com/magazine/wp-content/uploads/2015/11/new-hybrid-animals-photoshop-18.jpg"
            className="App-logo"
            alt="logo"
          />

          <h1 className="App-title">Pet Profiles!</h1>
        </header>
        <p className="App-intro">To get started, select Pets!</p>
        <p style={{ textAlign: "left", textDecorationLine: "underline" }}>
          Latest Profiles:
        </p>
        <Profile kids={this.props.kids} />
      </div>
    );
  }
}
