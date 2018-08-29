import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import firebase from "./firebase.js";

export default class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false
    };
    if (firebase.auth().currentUser) {
      this.setState({ loggedIn: true });
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

  handleClick = () => {
    firebase.auth().currentUser
      ? firebase
          .auth()
          .signOut()
          .then(() => this.setState({ loggedIn: false }))
          .catch(function(error) {
            console.log(error);
          })
      : firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .catch(function(error) {
            console.log(error);
          })
          .then(() => this.setState({ loggedIn: true }))
          .catch(function(error) {
            console.log(error);
          });
  };

  render() {
    return (
      <Navbar id="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" id="home">
              Home
            </NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="#">
            <NavLink to="/cats" id="cats">
              Cats
            </NavLink>
          </NavItem>
          <NavItem href="#">
            <NavLink to="/dogs" id="dogs">
              Dogs
            </NavLink>
          </NavItem>
          <NavItem href="#">
            <NavLink to="/birds" id="birds">
              Birds
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/advancedsearch" id="advancedSearch">
              Advanced Search
            </NavLink>
          </NavItem>
        </Nav>
        <Nav pullRight>
          {!firebase.auth().currentUser ? (
            <div>
              <NavItem>
                Sign In: Email:{" "}
                <input
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  type="email"
                  id="signInEmail"
                />
                Password:
                <input
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  type="password"
                  id="signInPassword"
                />
                <button
                  type="submit"
                  onClick={this.handleClick}
                  id="signInButton"
                >
                  {" "}
                  Log in
                </button>
              </NavItem>
              <NavItem>
                <NavLink to="/signup" id="signup">
                  Sign Up
                </NavLink>
              </NavItem>
            </div>
          ) : (
            <NavItem>
              <button
                type="submit"
                onClick={this.handleClick}
                id="signOutButton"
              >
                {" "}
                Sign Out
              </button>
            </NavItem>
          )}
          <NavItem>
            <NavLink to="/createprofile" id="createProfile">
              Create Profile
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
