export const stagingConfig = {
    baseUrl: "https://staging:fournierfamily.ovh", // TODO mettre la bonne addresse
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
        runMode: 1,
        openMode: 0,
    },
}