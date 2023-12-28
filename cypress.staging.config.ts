export const stagingConfig = {
    baseUrl: "https://staging:fournierfamily.ovh", // TODO mettre la bonne addresse
    defaultCommandTimeout: 30000,
    responseTimeout: 30000,
    env: {
        fixturesFolder: "cypress/fixtures",
        DEBUG: "cypress:*",
    },
    retries: {
        runMode: 1,
        openMode: 0,
    },
}