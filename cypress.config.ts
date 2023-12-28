import { defineConfig } from "cypress";
import { devConfig } from "./cypress.dev.config";
import { stagingConfig } from "./cypress.staging.config";
import { prodConfig } from "./cypress.prod.config";
function getConfig() {
    switch (process.env.CYPRESS_ENV) {
    case "development":
        return devConfig;
    case "staging":
        return stagingConfig;
    case "production":
        return prodConfig;
    default:
        return devConfig; // Default to development config
    }
}

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        ...getConfig(),
    },
});
