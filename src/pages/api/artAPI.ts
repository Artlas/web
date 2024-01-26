import apiConfig from "./apiConfig.json";
import { UserInfo } from "../../components/userContext";
import { getApiURL } from "./utilsAPI";
/**
 *
 * @param id de l'oeuvre
 * @returns l'oeuvre complete avec info
 */
export const getArtBasedOnUserIDFromDb = async (id: string) => {
    const getArtBasedOnUserID = getApiURL() + apiConfig.GET_ART_BASED_ID_ENDPOINT;
    let requestBody = {
        id: id,
    };
    try {
        let response = await fetch(getArtBasedOnUserID, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};

/**
 *
 * @param id de l'utilisateur
 * @returns retourne les oeuvres d'arts possédées par l'utilisateur
 */
export const getArtBasedOnIDFromDb = async (id: string) => {
    const getArtBasedOnID = getApiURL() + apiConfig.GET_ART_BASED_ID_USER_ENDPOINT;
    let requestBody = {
        id: id,
    };
    try {
        let response = await fetch(getArtBasedOnID, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};

/**
 *
 * @returns toutes les oeuvres dans la bdd
 */
export const getAllArt = async () => {
    const getAllArt = getApiURL() + apiConfig.GET_ALL_ART_ENDPOINT;
    try {
        let response = await fetch(getAllArt, {
            method: "GET",
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
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};

/**
 * Récupère la catégorie de l'oeuvre d'art
 * @param id  correspond à l'id de l'oeuvre
 * @returns  la catégorie de l'oeuvre
 */
export const getCartArt = async (id: string) => {
    const getCartArt = getApiURL() + apiConfig.GET_ART_CAT_ENDPOINT;
    let requestBody = {
        id: id,
    };
    try {
        let response = await fetch(getCartArt, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};

/**
 * Récupère les oeuvres d'art de la catégorie
 * @param cat correspond à la catégorie
 * @returns les oeuvres d'art de la catégorie
 */
export const getArtCat = async (cat: string) => {
    const getArtCat = getApiURL() + apiConfig.GET_ARTS_BASED_CAT_ENDPOINT;
    let requestBody = {
        cat: cat,
    };
    try {
        let response = await fetch(getArtCat, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};

/**
 * Rajoute une oeuvre d'art ( a considérer que l'on recoit un objet de type Art)
 */
export const addArt = async (art: any) => {
    const addArt = getApiURL() + apiConfig.ADD_ART_ENDPOINT;
    let requestBody = {
        art: art,
    };
    try {
        let response = await fetch(addArt, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'oeuvre d'art:", error);
        throw error;
    }
};

/**
 * Modifie une oeuvre d'art based on ID
 */
export const updateArt = async (art: any, id: string) => {
    const updateArt = getApiURL() + apiConfig.UPDATE_ART_ENDPOINT;
    let requestBody = {
        art: art,
        id: id,
    };
    try {
        let response = await fetch(updateArt, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la modification de l'oeuvre d'art:", error);
        throw error;
    }
};

/**
 * Supprime une oeuvre d'un utilisateur
 * @param id correspond à l'id de l'oeuvre
 */

export const deleteArt = async (id: string) => {
    const deleteArt = getApiURL() + apiConfig.DELETE_ART_ENDPOINT;
    let requestBody = {
        id: id,
    };
    try {
        let response = await fetch(deleteArt, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'oeuvre d'art:", error);
        throw error;
    }
};
