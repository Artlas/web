describe("1-2-CheckProfile", () => {
    beforeEach(() => {
        cy.customVisitHomePage();
        cy.loginWithBasicUser();
    });
    it("L'utilisateur peut accéder à sa page de profil", () => {
        cy.displayProfileMenu();
    });
    it("L'utilisateur peut accéder à sa page d'amis", () => {
        cy.displayFriendsMenu();
    });
    it("L'utilisateur peut accéder à sa page de liste d'oeuvres", () => {
        cy.displayListsMenu();
    });
    it("L'utilisateur peut accéder à sa page de paramètres", () => {
        cy.displaySettingsMenu();
    });
});
