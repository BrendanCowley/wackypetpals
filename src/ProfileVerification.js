import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";
import { Redirect } from "react-router-dom";

const actionCodeSettings = {
    url: document.URL + 'createprofile', // http://wackypetprofiles.surge.sh/#/finishedSignUp or http://localhost:3000/#/finishedSignUp
    handleCodeInApp: true
  }

export default class ProfileVerification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            redirect: false
        }
    }

    componentDidMount(){
        console.log(firebase.auth().currentUser)
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

  render() {
    if (this.state.redirect) {
        return <Redirect to='/createprofile' />;
    }
    return (
      <div className="App">
      <h1>Sign in with your email to create a profile</h1>
        <p>
          Email:{" "}
          <input value={this.state.email} onChange={this.handleEmailChange} type="email" />
        </p>
        <button
          type="submit"
          onClick={() => {
            firebase.auth().sendSignInLinkToEmail(this.state.email,actionCodeSettings).then((result) => {
              window.localStorage.setItem('emailForSignIn', this.state.email)
              console.log(result)
            }).catch(function(error){
              console.log(error)
            });

          }}
        > Send Email Verification! </button>
      </div>
    );
  }
}
