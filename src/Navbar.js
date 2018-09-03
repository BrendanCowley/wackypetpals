import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import firebase from "./firebase.js";
import "./Navbar.css";

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

  dropdownToggle = newValue => {
    if (this._forceOpen) {
      this.setState({ menuOpen: true });
      this._forceOpen = false;
    } else {
      this.setState({ menuOpen: newValue });
    }
  };
  menuItemClickedThatShouldntCloseDropdown = () => {
    this._forceOpen = true;
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
        {!firebase.auth().currentUser ? (
          <Nav pullRight>
            <NavDropdown
              eventKey={3}
              title="Sign In"
              open={this.state.menuOpen}
              onToggle={val => this.dropdownToggle(val)}
              id="signInDropdown"
            >
              <MenuItem
                eventKey={3.1}
                onClick={() => this.menuItemClickedThatShouldntCloseDropdown()}
              >
                <div className="grid-container">
                  Email:{" "}
                  <input
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    type="email"
                    id="signInEmail"
                  />
                  Password:{" "}
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
                    style={{ backgroundColor: "white" }}
                  >
                    Log in
                  </button>
                </div>
              </MenuItem>
            </NavDropdown>
            <NavItem>
              <NavLink to="/signup" id="signup">
                Sign Up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/createprofile" id="createProfile">
                Create Profile
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem>
              <NavLink to="/myprofiles" id="myprofiles">
                My Profiles
              </NavLink>
            </NavItem>
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
            <NavItem>
              <NavLink to="/createprofile" id="createProfile">
                Create Profile
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    );
  }
}
