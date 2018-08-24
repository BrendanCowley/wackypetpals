import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class MyNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" id="home">Home</NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="#">
            <NavLink to="/cats" id="cats">Cats</NavLink>
          </NavItem>
          <NavItem href="#">
            <NavLink to="/dogs" id="dogs">Dogs</NavLink>
          </NavItem>
          <NavItem href="#">
            <NavLink to="/birds" id="birds">Birds</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/advancedsearch" id="advancedSearch">Advanced Search</NavLink>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <NavLink to="/finishedSignUp" id="createProfile">Create Profile</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
