import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";
import { Redirect } from "react-router-dom";

const actionCodeSettings = {
    url: 'http://localhost:3000/#/createprofile', // http://wackypetprofiles.surge.sh/#/createprofile or http://localhost:3000/#/createprofile
    handleCodeInApp: true
  }

export default class ProfileVerification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            redirect: false,
            password: ""
        }
    }

    componentDidMount(){
        if(firebase.auth().currentUser != undefined){
            this.setState({
                redirect: true
            })
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

  render() {
    if (this.state.redirect) {
        return <Redirect to='/createprofile' />;
    }
    return (
      <div className="App">
      <h1>Sign up with your email to create a profile</h1>
        <p>
          Email:{" "}
          <input value={this.state.email} onChange={this.handleEmailChange} type="email" />
        </p>
        <p>
          Password:{" "}
          <input value={this.state.password} onChange={this.handlePasswordChange} type="password"/>
        </p>
        <button
          type="submit"
          onClick={() => {
              firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                console.log(error)
              });
          }}
        > Sign Up! </button>
      </div>
    );
  }
}
