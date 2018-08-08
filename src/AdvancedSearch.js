import React, { Component } from "react";
import "./profile.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import queryString from "query-string";

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      age: 0
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleTypeChange(event) {
    this.setState({
      type: event.target.value
    });
  }

  handleAgeChange(event) {
    this.setState({
      age: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(
      "/advancedsearch?" +
        "name=" +
        this.state.name.toLowerCase() +
        "&type=" +
        this.state.type.toLowerCase() +
        "&age=" +
        this.state.age
    );
  }

  render() {
    const values = queryString.parse(this.props.location.search);
    var searchProfiles = this.props.kids
      .filter(item => item.name.toLowerCase().includes(values.name))
      .filter(item => item.type.includes(values.type))
      .filter(
        item => item.age == parseInt(values.age) || parseInt(values.age) == ""
      );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            Name:{" "}
            <input value={this.state.name} onChange={this.handleNameChange} />
          </p>

          <br />
          <p>
            Type:{" "}
            <input value={this.state.type} onChange={this.handleTypeChange} />
          </p>

          <br />
          <p>
            Age:{" "}
            <input
              type="number"
              value={this.state.age === 0 ? "" : this.state.age}
              onChange={this.handleAgeChange}
            />
          </p>
          <button id="myBtn" type="submit">
            Search!
          </button>
        </form>
        {searchProfiles.map(item => (
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
  }
}
