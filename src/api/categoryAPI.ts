import { getApiURL } from "./utilsAPI";
import apiConfig from "./apiConfig.json";
/**
 *
 * @returns tous les categories et dedans les sub
 */
export const fetchAllCategories = async () => {
    const fetchAllCategoriesEndpoint = getApiURL() + apiConfig.GET_ALL_CATEGORIES_ENDPOINT;

    try {
        let response = await fetch(fetchAllCategoriesEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        throw error;
    }
};

export const fetchAllSubCategories = async (category : string) => {
    /**
     * Call de fetchAllCategories et je retourne uniquement les tableaux des subcategories
     */
};
