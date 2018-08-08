import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import Home from "./home.js";
import Animals from "./Animals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MyNavbar from "./Navbar.js";
import AdvancedSearch from "./AdvancedSearch.js";
import CreateProfile from "./CreateProfile";
import firebase from "./firebase.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kids: []
    };
    this.profileButton = this.profileButton.bind(this);
  }

  componentDidMount() {
    const profiles = firebase.database().ref("profiles");
    profiles.on("value", snapshot => {
      let kids = snapshot.val();
      let newState = [];
      for (let kid in kids) {
        newState.push({
          name: kids[kid].name,
          age: kids[kid].age,
          type: kids[kid].type,
          picture: kids[kid].picture
        });
      }
      this.setState({
        kids: newState.reverse()
      });
    });
  }

  profileButton = childState => {
    if (childState.image == "") {
      childState.image =
        "https://pawedin.com/system/pets/default_images/default_pet.jpg";
    }
    this.setState({
      kids: [childState, ...this.state.kids]
    });
    const profiles = firebase.database().ref("profiles");
    profiles.push(childState);
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <MyNavbar />
            <Switch>
              <Route
                path="/"
                render={props => <Home {...props} kids={this.state.kids} />}
                exact
              />
              <Route
                path="/cats"
                render={props => (
                  <Animals {...props} kids={this.state.kids} type="cat" />
                )}
              />
              <Route
                path="/dogs"
                render={props => (
                  <Animals {...props} kids={this.state.kids} type="dog" />
                )}
              />
              <Route
                path="/birds"
                render={props => (
                  <Animals {...props} kids={this.state.kids} type="bird" />
                )}
              />
              <Route
                path="/advancedsearch"
                render={props => (
                  <AdvancedSearch
                    {...props}
                    kids={this.state.kids}
                    type="bird"
                  />
                )}
              />
              <Route
                path="/createprofile"
                render={props => (
                  <CreateProfile
                    {...props}
                    kids={this.state.kids}
                    profileButton={this.profileButton}
                    type="bird"
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
