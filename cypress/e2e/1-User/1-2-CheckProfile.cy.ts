describe("1-2-CheckProfile", ()=>{
    const idUser = Cypress.env("baseIdUser");
    const userPassword = Cypress.env("baseUserPassword");
    const url = Cypress.env("baseUrl");
    beforeEach(() => {
        cy.customVisitHomePage();
    });
    it("L'utilisateur peut accéder à sa page de profil", ()=>{
        cy.login(idUser,userPassword);
        cy.displayProfileMenu();

    });
    it("L'utilisateur peut accéder à sa page d'amis" , () =>{
        cy.login(idUser,userPassword);
        cy.displayFriendsMenu();
    });
    it("L'utilisateur peut accéder à sa page de liste d'oeuvres" , () =>{
        cy.login(idUser,userPassword);
        cy.displayListsMenu();
    });
    it("L'utilisateur peut accéder à sa page de paramètres" , () =>{
        cy.login(idUser,userPassword);
        cy.displaySettingsMenu();
    });
})

