describe("Tentative de Connexion", () => {
    const idUser = Cypress.env("baseUser").id;
    const userPassword = Cypress.env("baseUser").password;
    const url = Cypress.env("baseUrl");
    beforeEach(() => {
        cy.customVisitHomePage();
    });
    it("Accéder à la page principale de Artlas", () => {
        cy.wait(1000);
        cy.get("#HomeView").should("exist");
        cy.contains("Bienvenue sur Artlas");
    });

    it("Les boutons principaux d'actions sont visibles et cliquables pour l'utilisateur", () => {
        cy.get("#openSidePanelButton").should("exist");
        cy.get("#openSidePanelButton").click();
        cy.get("#openDiscoverLink").should("exist");
        cy.get("#openDiscoverLink").click();
        cy.get("#openUserMenuButton").should("exist");
        cy.get("#openUserMenuButton").click();
    });
    it("L'utilisateur peut accéder au formulaire de connexion", () => {
        cy.get("#openUserMenuButton").click();
        cy.get("#loginButton").should("exist");
        cy.get("#loginButton").click();
        cy.get("#loginForm").should("exist");
        cy.checkForLoginPossibilities();
    });
    it("L'utilisateur peut rentrer ses informations et se connecter", () => {
        // TODO
        /*
            Rajouter un aspect d'interractivité pour les boutons, dans le cas du login,
            si j'ai pas de user mdp renseigné, bouton grisé
            cy.get("#loginLoginButton").should('be.disabled');
        */
        cy.login(idUser, userPassword);
    });
    it("Un utilisateur peut se connecter et se déconnecter", () => {
        cy.login(idUser, userPassword);
        cy.get("#logoutButton").should("exist");
        cy.get("#logoutButton").click();
    });
    it("Un utilisateur peut se créer un compte en remplissant le formulaire de création de compte", () => {
        cy.get("#openUserMenuButton").click();
        cy.get("#loginButton").should("exist");
        cy.get("#loginButton").click();
        cy.createBasicUser();
    });
});
