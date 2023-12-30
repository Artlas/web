//TODO
// Mettre photographie dans arts plastiques
//Peut etre réduire le nombre de trucs en cuisine
// Enlever Steam peut etre ?

//section-

describe("2-1-CheckOptions", () => {
    let artsData: any;
    beforeEach(() => {
        cy.customVisitHomePage();
        cy.loginWithBasicUser();
        cy.fixture("arts").as("artsData");
    });
    it("L'utilisateur peut se connecter et accéder à la page Discover", () => {
        cy.wait(1000);
        //cy.get("#openSidePanelButton").click();
        cy.get("#openDiscoverLink").click();
        cy.get("#discoverView").should("exist");
    });
    it("L'utilisateur peut se connecter et accéder à la page principale des films", () => {
        // cy.get("#openSidePanelButton").click();
        cy.get("#cinemaCategoryNavigationButton1").click();
        cy.get("#cinemaallNavigationLink").click();
        //cy.get("#moviesView").should("exist");
    });
    before(() => {
        cy.fixture("arts").as("artsData");
    });
    beforeEach(() => {
        for (const art of artsData.arts) {
            for (const category of art.categories) {
                it(`Test pour la catégorie ${category} dans ${art.type}`, () => {
                    // Votre logique de test pour 'category' dans 'art.type'
                    cy.visit(`/art/${art.type}/${category}`);
                    // D'autres assertions ou commandes pour cette catégorie spécifique
                });
            }
        }
    });
});
