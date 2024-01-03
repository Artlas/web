export const prodConfig = {
    baseUrl: "https://fournierfamily.ovh",
    defaultCommandTimeout: 30000,
    responseTimeout: 30000,
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
        runMode: 0,
        openMode: 0,
    },
}