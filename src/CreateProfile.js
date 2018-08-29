import React, { Component } from "react";
import "./profile.css";
import firebase from "./firebase.js";
import { Redirect, withRouter } from "react-router-dom";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      type: "",
      picture: "https://pawedin.com/system/pets/default_images/default_pet.jpg",
      email: ""
    };
    if(firebase.auth().currentUser){
      this.setState({email: firebase.auth().currentUser.email})
    }
  }

  componentDidMount(){

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
          email = window.prompt('Please provide your email for confirmation');
      }
      if (!email) {
        this.setState({
          redirectHome: true
        })
        return
      }
      firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(result => {
          window.localStorage.removeItem('emailForSignIn');
      })
      .then(() => (this.setState({
        email: firebase.auth().currentUser.email
      })))
      .catch(function(error) {
      console.log(error)
      });
    }
    else if (firebase.auth().currentUser != undefined){
      this.setState({
        email: firebase.auth().currentUser.email
      })
      return
    }
    else{
      this.setState({
        redirect: true
      })
      return
    }
}

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleTypeChange = event => {
    this.setState({
      type: event.target.value
    });
  };

  handleAgeChange = event => {
    this.setState({
      age: event.target.value
    });
  };

  handleImageChange = event => {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = e => {
      var picture = e.target.result;
      this.setState({
        picture
      });
    };
    reader.readAsDataURL(file);
  };

  resetState = () => {
    this.setState({
      name: "",
      age: 0,
      type: "",
      picture: "https://pawedin.com/system/pets/default_images/default_pet.jpg"
    });
  };

  render() {
    if (this.state.redirectHome) {
      return <Redirect to ="/" />
    }
    if (this.state.redirect) {
      return <Redirect to='/signup' />;
    }
    return (
      <div>
        <h1>
          <u>Create Profile!</u>
        </h1>
        <br />
        <br />
        <p>
          Name:{" "}
          <input value={this.state.name} onChange={this.handleNameChange} id="profileName" />
        </p>
        <p>
          Age:{" "}
          <input
            type="number"
            value={this.state.age === 0 ? "" : this.state.age}
            onChange={this.handleAgeChange} id="profileAge"
          />
        </p>
        <p>
          Species:{" "}
          <input value={this.state.type} onChange={this.handleTypeChange} id="profileType" />
        </p>
        <p>
          Upload Picture:{" "}
          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageChange} id="profilePic"
          />
        </p>
        <img src={this.state.picture} className="Pic" />
        <br />
        <button
          type="submit"
          onClick={() => {
            this.props.profileButton(this.state);
            this.resetState();
          }} id="profileButton"
        >
          Create Profile
        </button>
      </div>
    );
  }
}

export default withRouter(CreateProfile);