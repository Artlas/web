import { getApiURL } from "./utilsAPI";
import apiConfig from "./apiConfig.json";
/**
 *
 * @returns tous les categories et dedans les sub
 */
export const fetchAllCategoriesFromDB = async () => {
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
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        throw error;
    }
};

export const fetchAllSubCategoriesFromCategoryFromDB = async (category: string) => {
    let fetchSubCategoryEndpoint = getApiURL() + apiConfig.GET_ALL_SUBCAT_FROM_ENDPOINT;
    let requestBody = {
        category: category,
    };
    try {
        let response = await fetch(fetchSubCategoryEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des sous catégories:", error);
        throw error;
    }
    /**
     * Call de fetchAllCategories et je retourne uniquement les tableaux des subcategories
     */
};
