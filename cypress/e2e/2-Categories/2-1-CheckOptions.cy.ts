//TODO

//Peut etre réduire le nombre de trucs en cuisine

interface ArtData {
    arts: Array<{
        type: string;
        categories: string[];
    }>;
}
describe("Accès pages", () => {
    beforeEach(() => {
        cy.customVisitHomePage();
        cy.loginWithBasicUser();
        cy.log("MESSAGE");
    });
    it("L'utilisateur peut se connecter et accéder à la page Discover", () => {
        cy.get("#openDiscoverLink").click();
        cy.get("#discoverView").should("exist");
    });
    it("L'utilisateur peut se connecter et accéder à la page principale des films", () => {
        cy.get("#cinemaCategoryNavigationButton1").click();
        cy.get("#cinemaallNavigationLink").click();
    });
});
describe("Accès aux pages des catégories d'art", () => {
    let artsData: ArtData;
    before(() => {
        cy.customVisitHomePage();
        cy.loginWithBasicUser();
        cy.fixture("arts").then((data: ArtData) => {
            artsData = data;
        });
    });

    it("Test de l'accessibilité de toutes les catégories répertoriées",  () => {
        if (!artsData) {
            throw new Error("Les données de fixture n'ont pas été chargées");
        }
        artsData.arts.forEach((art, typeIndex) => {
            const categoryId = `${art.type.toLowerCase()}CategoryNavigationButton${typeIndex + 1}`;
            cy.get(`#${categoryId}`).click();
            art.categories.forEach((category, index) => {
                const categoryLinkId = `${art.type.toLowerCase()}${category}NavigationLink`;
                cy.get(`#${categoryLinkId}`).click();
            });
        });
    });
});