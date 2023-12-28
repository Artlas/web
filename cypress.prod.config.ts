export const prodConfig = {
    baseUrl: "https://fournierfamily.ovh",
    defaultCommandTimeout: 30000,
    responseTimeout: 30000,
    env: {
        fixturesFolder: "cypress/fixtures",
        DEBUG: "cypress:*",
    },
    retries: {
        runMode: 0,
        openMode: 0,
    },
}