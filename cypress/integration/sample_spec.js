import firebase from "../../src/firebase.js";

describe("Components render as intended", function() {
  it("Can use the nav bar to get to the correct pages", function() {
    cy.visit("http://localhost:3000/");
    cy.get("#cats").click();
    cy.url().should("eq", "http://localhost:3000/#/cats");
    cy.get("#dogs").click();
    cy.url().should("eq", "http://localhost:3000/#/dogs");
    cy.get("#birds").click();
    cy.url().should("eq", "http://localhost:3000/#/birds");
    cy.get("#advancedSearch").click();
    cy.url().should("eq", "http://localhost:3000/#/advancedsearch");
    cy.get("#createProfile").click();
    cy.url().should("eq", "http://localhost:3000/#/signup");
  });

  it("should be able to search for specific profiles", function() {
    cy.visit("http://localhost:3000/#/advancedsearch");
    cy.get("#name").type("birb");
    cy.get("#age").type("9");
    cy.get("#type").type("bird");
    cy.get("#myBtn").click();
    cy.get("[data-qa=profile]").contains("name: birb, age: 9, type: bird");
  });

  it("should redirect to email sign in page if attempting to create a profile when not logged in", function() {
    cy.visit("http://localhost:3000/#/createprofile");
    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/#/signup");
    });
  });

  it("should sign in allow create profile page to be rendered when signed in", function() {
    cy.visit("http://localhost:3000/");
    cy.get("#signInEmail").type("fake@fake.com");
    cy.get("#signInPassword").type("password");
    cy.get("#signInButton").click();
    cy.get("#signOutButton").should("be.visible");
    cy.get("#createProfile").click();
    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/#/createprofile");
    });
  });

  // it('should create a new profile successfully', function(){

  //     cy.visit('http://localhost:3000/#/createprofile');
  //     cy.get('#signOutButton').should('be.visible');
  //     cy.get('#createProfile').click();
  //     cy.get('#profileName').type('Wacky_Testy');
  //     cy.get('#profileAge').type('2');
  //     cy.get('#profileType').type('Wacky');
  //     cy.get('#profileButton').click();
  //     cy.visit('http://localhost:3000/#/advancedsearch');
  //     cy.get('#name').type('Wacky_Testy');
  //     cy.get('#age').type('2');
  //     cy.get('#type').type('Wacky');
  //     cy.get('#myBtn').click();
  //     cy.get('[data-qa=profile]').contains('name: Wacky_Testy, age: 2, type: Wacky');
  // })

  after(function() {
    cy.get("#signOutButton").click();
  });
});
