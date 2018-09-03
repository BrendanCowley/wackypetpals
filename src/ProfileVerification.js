import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";
import { Redirect } from "react-router-dom";
import "./ProfileVerification.css";

const actionCodeSettings = {
  url: "http://localhost:3000/#/createprofile", // http://wackypetprofiles.surge.sh/#/createprofile or http://localhost:3000/#/createprofile
  handleCodeInApp: true
};

export default class ProfileVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      redirect: false,
      password: ""
    };
  }

  componentDidMount() {
    if (firebase.auth().currentUser != undefined) {
      this.setState({
        redirect: true
      });
    }
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  createTheProfile = () => {
    if (this.state.email != "" && this.state.password != "") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
          console.log(error);
        });
      const accounts = firebase.database().ref("accounts");
      var account = {
        email: this.state.email,
        role: "user"
      };
      accounts.push(account);
      this.setState({
        email: "",
        redirect: true,
        password: ""
      });
    } else {
      alert("enter an email and password to create an account!");
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/createprofile" />;
    }
    return (
      <div className="App">
        <h1>Sign up with your email to create a profile</h1>
        <div className="grid-container2">
          <p>Email: </p>
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="email"
          />

          <p>Password: </p>
          <input
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type="password"
          />
          <p />
          <button type="submit" onClick={this.createTheProfile}>
            {" "}
            Sign Up!{" "}
          </button>
        </div>
      </div>
    );
  }
}
