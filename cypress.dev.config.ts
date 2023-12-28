export const devConfig= {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    responseTimeout: 20000,
    env: {
        fixturesFolder: "cypress/fixtures",
        DEBUG: "cypress:*",
    },
    retries: {
        runMode: 2,
        openMode: 1,
    },
}