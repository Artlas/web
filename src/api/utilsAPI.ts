export const getApiURL = () => {
    // Vérifier d'abord si l'environnement est en production
    /* if (process.env.NODE_ENV === "production" || window.location.hostname.includes("fournierfamily.ovh")) {
        return "https://api.fournierfamily.ovh";
    }*/

    // Sinon, on considère que c'est l'environnement de staging
    return "https://api.fournierfamily.ovh";
    //"https://api-staging.fournierfamily.ovh/"; // URL de développement/staging
};
