export const devConfig = {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    responseTimeout: 20000,
    env: {
        fixturesFolder: "cypress/fixtures",
        DEBUG: "cypress:*",
        baseUser: {
            id: "Nico",
            email: "nico@gmail.com",
            firstName: "Nico",
            lastName: "DL",
            birthDate: "2000-05-05",
            address: "Paris",
            password: "password",
        },
    },
    retries: {
        runMode: 2,
        openMode: 1,
    },
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,

    //https://runebook.dev/fr/docs/cypress/api/commands/session
};
