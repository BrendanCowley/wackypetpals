import React, { Component } from "react";
import "./profile.css";

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      type: "",
      picture: "https://pawedin.com/system/pets/default_images/default_pet.jpg"
    };
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
      console.log(picture);
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
    return (
      <div>
        <h1>
          <u>Create Profile!</u>
        </h1>
        <br />
        <br />
        <p>
          Name:{" "}
          <input value={this.state.name} onChange={this.handleNameChange} />
        </p>
        <p>
          Age:{" "}
          <input
            type="number"
            value={this.state.age === 0 ? "" : this.state.age}
            onChange={this.handleAgeChange}
          />
        </p>
        <p>
          Species:{" "}
          <input value={this.state.type} onChange={this.handleTypeChange} />
        </p>
        <p>
          Upload Picture:{" "}
          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageChange}
          />
        </p>
        <img src={this.state.picture} className="Pic" />
        <br />
        <button
          type="submit"
          onClick={() => {
            this.props.profileButton(this.state);
            this.resetState();
          }}
        >
          Create Profile
        </button>
      </div>
    );
  }
}
