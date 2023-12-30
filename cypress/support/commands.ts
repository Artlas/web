/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("customVisitHomePage", () => {
    const url = Cypress.env("baseUrl") || "http://localhost:3000";
    cy.visit(url);
    cy.get("#HomeView").should("exist");
});
// #region Login Logout
Cypress.Commands.add("login", (idUser, userPassword) => {
    cy.get("#openUserMenuButton").click();
    cy.get("#loginButton").should("exist");
    cy.get("#loginButton").click();
    cy.get("#loginForm").should("exist");
    cy.get("#usernameLoginInput").should("exist");
    cy.get("#passwordLoginInput").should("exist");
    cy.get("#usernameLoginInput").type(idUser);
    cy.get("#passwordLoginInput").type(userPassword);
    console.log("ID Utilisateur :" + idUser);
    console.log("Mot de passe :" + userPassword);
    cy.get("#loginLoginButton").should("exist");
    cy.get("#loginLoginButton").click();
    cy.get("#HomeView").should("exist");
    cy.contains("Bienvenue sur Artlas");
    cy.checkIfLoggedIn();
});
Cypress.Commands.add("loginWithBasicUser", () => {
    cy.get("#openUserMenuButton").click();
    cy.get("#loginButton").should("exist");
    cy.get("#loginButton").click();
    cy.get("#loginForm").should("exist");
    cy.get("#usernameLoginInput").should("exist");
    cy.get("#passwordLoginInput").should("exist");
    const idUser = Cypress.env("baseIdUser")
    const userPassword= Cypress.env("baseUserPassword");
    cy.get("#usernameLoginInput").type(idUser);
    cy.get("#passwordLoginInput").type(userPassword);
    console.log("ID Utilisateur :" + idUser);
    console.log("Mot de passe :" + userPassword);
    cy.get("#loginLoginButton").should("exist");
    cy.get("#loginLoginButton").click();
    cy.get("#HomeView").should("exist");
    cy.contains("Bienvenue sur Artlas");
    cy.checkIfLoggedIn();
});

Cypress.Commands.add("logout", () => {
    cy.get("#openUserMenuButton").click();
    cy.get("#logoutButton").should("exist");
    cy.get("#logoutButton").click();
    cy.get("#HomeView").should("exist");
    cy.contains("Bienvenue sur Artlas");
});

Cypress.Commands.add("checkForLoginPossibilities", () => {
    cy.get("#usernameLoginInput").should("exist");
    cy.get("#passwordLoginInput").should("exist");
    cy.get("#loginLoginButton").should("exist");
    cy.get("#loginGoogleButton").should("exist");
    cy.get("#loginMicrosoftButton").should("exist");
    cy.get("#loginGithubButton").should("exist");
    // TODO
    /*
      Implémenter facebook au lieu de git ?
    */
});

Cypress.Commands.add("checkIfLoggedIn", () => {
    cy.get("#openUserMenuButton").should("exist");
    cy.get("#openUserMenuButton").click();
    cy.get("#openProfileLink").should("exist");
    cy.get("#openFriendsLink").should("exist");
    cy.get("#openMyListsLink").should("exist");
    cy.get("#openSettingsLink").should("exist");
});
// #endregion

// #region Menus
Cypress.Commands.add("displayProfileMenu", () => {
    cy.get("#openProfileLink").should("exist");
    cy.get("#openProfileLink").click();
    cy.get("#profileMenu").should("exist");
    cy.get("#profileMenu").should("be.visible");
});

Cypress.Commands.add("displayFriendsMenu", () => {
    cy.get("#openFriendsLink").should("exist");
    cy.get("#openFriendsLink").click();
    cy.get("#friendsMenu").should("exist");
    cy.get("#friendsMenu").should("be.visible");
});

Cypress.Commands.add("displayListsMenu", () => {
    cy.get("#openMyListsLink").should("exist");
    cy.get("#openMyListsLink").click();
    cy.get("#listMenu").should("exist");
    cy.get("#listMenu").should("be.visible");
});

Cypress.Commands.add("displaySettingsMenu", () => {
    cy.get("#openSettingsLink").should("exist");
    cy.get("#openSettingsLink").click();
    cy.get("#settingsMenu").should("exist");
    cy.get("#settingsMenu").should("be.visible");
});
// #endregion

declare global {
    namespace Cypress {
        interface Chainable {
            customVisitHomePage(): Chainable<void>;
            login(idUser: string, userPassword: string): Chainable<void>;
            loginWithBasicUser(): Chainable<void>;
            checkForLoginPossibilities(): Chainable<void>;
            checkIfLoggedIn(): Chainable<void>;
            displayFriendsMenu(): Chainable<void>;
            displayProfileMenu(): Chainable<void>;
            displaySettingsMenu(): Chainable<void>;
            logout(): Chainable<void>;
            displayListsMenu(): Chainable<void>;
        }
    }
}
export {};
