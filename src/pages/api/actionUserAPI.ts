import { getApiURL } from "./utilsAPI";
import apiConfig from "./apiConfig.json";

/**
 *
 * @param id de l'oeuvre d'art
 * @param idUser id de User, rajouter l'id dans le tableau du user based on ID likedList & increment +1 l'oeuvre
 */
export const likeArt = async (id: string, user: any) => {
    const likeArtEndpoint = getApiURL() + apiConfig.LIKE_ART_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(likeArtEndpoint, {
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
    } catch (error) {
        console.error("Erreur lors du like de l'oeuvre d'art:", error);
        throw error;
    }
};
/**
 *
 * @param id oeuvre d'art
 * @param idUser user, retirer l'id de l'oeuvre dans le tableau et décrement oeuvre de 1
 */
export const unlikeArt = async (id: string, user: any) => {
    const likeArtEndpoint = getApiURL() + apiConfig.UNLIKE_ART_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(likeArtEndpoint, {
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
    } catch (error) {
        console.error("Erreur lors du like de l'oeuvre d'art:", error);
        throw error;
    }
};
/**
 *
 * @param idArt id de l'oeuvre
 * @param idList id de la liste sur laquelle mettre l'id
 * @param user correspond au user
 *  IMPORTANT, utiliser cette fonction pour la galerie
 */
export const addArtToList = async (idArt: string, idList: string, user: any) => {
    const addArtToListEndpoint = getApiURL() + apiConfig.ADD_ART_TO_LIST_ENDPOINT;
    let requestBody = {
        idArt: idArt,
        idList: idList,
        user: user,
    };
    try {
        let response = await fetch(addArtToListEndpoint, {
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
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'oeuvre d'art à la liste:", error);
        throw error;
    }
};
export const removeArtFromList = async (idArt: string, idList: string, user: any) => {
    const removeArtFromListEndpoint = getApiURL() + apiConfig.REMOVE_ART_FROM_LIST_ENDPOINT;
    let requestBody = {
        idArt: idArt,
        idList: idList,
        user: user,
    };
    try {
        let response = await fetch(removeArtFromListEndpoint, {
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
    } catch (error) {
        console.error("Erreur lors de la suppression de l'oeuvre d'art à la liste:", error);
        throw error;
    }
};
/**
 *
 * @param idList nom de la liste d'art
 * @param idUser id user
 */
export const createNewList = async (idList: string, descriptionList: string, illustration: string, user: any) => {
    const createNewListEndpoint = getApiURL() + apiConfig.CREATE_NEW_LIST_ENDPOINT;
    let requestBody = {
        idList: idList,
        descriptionList: descriptionList,
        illustration: illustration,
        user: user,
    };
    try {
        let response = await fetch(createNewListEndpoint, {
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
    } catch (error) {
        console.error("Erreur lors de la création de la liste:", error);
        throw error;
    }
};

export const retrieveNumberOfListsSaved = async () => {
    const retrieveNumberOfListsSavedEndpoint = getApiURL() + apiConfig.RETRIEVE_NUMBER_OF_LISTS_SAVED_ENDPOINT;
    try {
        let response = await fetch(retrieveNumberOfListsSavedEndpoint, {
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
        console.error("Erreur lors de la récupération du nombre de listes:", error);
        throw error;
    }
};
