describe("2-1-CheckOptions", () => {
    beforeEach(() => {
        cy.customVisitHomePage();
        cy.loginWithBasicUser();
    });
    it("L'utilisateur peut se connecter et accéder à la page Discover", () => {
        cy.get("#openSidePanelButton").click();
        cy.get("#openDiscoverLink").click();
        cy.get("#discoverView").should("exist");
    });
    it("L'utilisateur peut se connecter et accéder à la page principale des films", () => {
        cy.get("#openSidePanelButton").click();
        cy.get("#cinemaCategoryNavigationButton1").click();
        cy.get("#cinemaallNavigationLink").click();
        cy.get("#moviesView").should("exist");
    });
});
