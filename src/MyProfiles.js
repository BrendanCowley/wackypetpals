import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";

export default class MyProfiles extends Component {
  constructor(props) {
    super(props);
  }

  deleteProfile = reference => {
    firebase
      .database()
      .ref("profiles")
      .child(reference)
      .remove();
  };

  render() {
    var isAdmin = false;
    var kids = this.props.kids;
    console.log(kids);
    const accounts = firebase.database().ref("accounts");
    accounts.on("value", snapshot => {
      let users = snapshot.val();
      // let newState = [];
      for (let user in users) {
        //   newState.push({
        //     name: kids[kid].name,
        //     age: kids[kid].age,
        //     type: kids[kid].type,
        //     picture: kids[kid].picture,
        //     isValidated: kids[kid].isValidated,
        //     email: kids[kid].email,
        //     reference: kid
        //   });
        if (users[user].email == firebase.auth().currentUser.email) {
          if (users[user].role == "admin") {
            isAdmin = true;
          }
        }
      }
    });
    if (isAdmin) {
      kids = kids.map(item => (
        <div key={item.name}>
          <div className="Border">
            <img src={item.picture} className="Pic" />
            <p>
              name: {item.name}, age: {item.age}, type: {item.type}
            </p>
            <button
              type="submit"
              onClick={() => this.deleteProfile(item.reference)}
              id="deleteProfileButton"
            >
              Delete Profile
            </button>
          </div>
          <hr />
        </div>
      ));
    } else {
      kids = kids
        .filter(item => item.email == firebase.auth().currentUser.email)
        .map(item => (
          <div key={item.name}>
            <div className="Border">
              <img src={item.picture} className="Pic" />
              <p>
                name: {item.name}, age: {item.age}, type: {item.type}
              </p>
              <button
                type="submit"
                onClick={() => this.deleteProfile(item.reference)}
                id="deleteProfileButton"
              >
                Delete Profile
              </button>
            </div>
            <hr />
          </div>
        ));
    }
    console.log(isAdmin);
    console.log(kids);
    return isAdmin ? (
      <div>
        <h1>Admin Rights Enabled</h1> {kids}
      </div>
    ) : (
      <div>{kids}</div>
    );
  }
}
