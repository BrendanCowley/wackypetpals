import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class MyNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/">Home</NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="#">
            <NavLink to="/cats">Cats</NavLink>
          </NavItem>
          <NavItem href="#">
            <NavLink to="/dogs">Dogs</NavLink>
          </NavItem>
          <NavDropdown eventKey={3} title="Birds" id="basic-nav-dropdown">
            <NavLink to="/birds">
              <MenuItem>Angsty</MenuItem>
              <MenuItem>Calm</MenuItem>
              <MenuItem>Suck ups</MenuItem>
              <MenuItem divider />
            </NavLink>
            {/* <MenuItem eventKey={3.3}>Separated Link</MenuItem> */}
          </NavDropdown>
          <NavItem>
            <NavLink to="/advancedsearch">Advanced Search</NavLink>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <NavLink to="/createprofile">Create Profile</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
