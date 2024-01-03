
const baseUrl = Cypress.config("baseUrl")
describe("Checking Display", () => {
    it("Visite la page d’accueil", () => {
        cy.visit("/"); // Visite automatiquement baseUrl
        cy.contains("Bienvenue sur Artlas");

        // Assurez-vous de cibler un élément spécifique ici
        // Par exemple, si vous voulez vérifier dans tout le body
        cy.get("body").should("not.contain", "Nicolas sur Artlas");
    });
});
