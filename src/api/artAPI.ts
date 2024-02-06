import apiConfig from "./apiConfig.json";
import { UserInfo } from "../components/userContext";
import { getApiURL } from "./utilsAPI";
// IMPORTANT
// CRUD pour art
//TODO FAIRE UN GET ART BASED ON USER ID
/**
 * Retourne l'oeuvre d'un artiste
 * @param id de l'oeuvre
 * @returns l'oeuvre complete avec info
 */
export const getArtBasedOnID = async (id: any) => {
    const getArtBasedOnUserID = getApiURL() + apiConfig.GET_ART_BASED_ID_ENDPOINT;
    console.log(getArtBasedOnUserID);
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
        console.log(result);
        if (result.error) {
            console.log(result.error);
            //throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};

/**
 *
 * @returns tous les ids des oeuvres d'arts
 */
export const getAllArtIDs = async () => {
    const getAllArtIDs = getApiURL() + apiConfig.GET_ALL_ART_IDS_ENDPOINT;
    try {
        let response = await fetch(getAllArtIDs, {
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
        console.error("Erreur lors de la récupération des oeuvres d'arts:", error);
        throw error;
    }
};
/**
 *TODO
 * @param id de l'utilisateur
 * @returns retourne les oeuvres d'arts possédées par l'utilisateur
 */
export const getArtsBasedOnIDFromDb = async (id: string) => {
    const getArtBasedOnID = getApiURL() + apiConfig.GET_ART_BASED_ID_USER_ENDPOINT;
    let requestBody = {
        author: id,
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
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (result.error) {
            console.log(result.error);
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
 */ /*
export const addArt = async (art: any, user: any) => {
    const addArt = getApiURL() + apiConfig.ADD_ART_ENDPOINT;
    let requestBody = {
        title: art.title,
        description: art.description,
        author: art.author,
        category: art.category,
        subCategory: art.subCategory,
        illustration: art.illustration,
        video: art.video,
        isMediaTypeImages: art.isMediaTypeImages,
        toSell: art.toSell,
        price: art.price,
        linkToBuy: art.linkToBuy,
        canTchat: art.canTchat,
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
};*/ export const addArt = async (art: any, user: any) => {
    const addArt = getApiURL() + apiConfig.ADD_ART_ENDPOINT;
    let formdata = new FormData();
    formdata.append("title", art.title);
    formdata.append("description", art.description);
    formdata.append("author", art.author);
    formdata.append("category", art.category);
    formdata.append("subCategory", art.subCategory);
    for (let i = 0; i < art.illustration.length; i++) {
        formdata.append("illustration", art.illustration[i]);
    }
    formdata.append("video", art.video);
    formdata.append("isMediaTypeImages", art.isMediaTypeImages);
    formdata.append("toSell", art.toSell);
    formdata.append("price", art.price);
    formdata.append("linkToBuy", art.linkToBuy);
    formdata.append("canTchat", art.canTchat);
    formdata.append("releaseDate", art.releaseDate);
    formdata.append("postDate", art.postDate);

    try {
        let response = await fetch(addArt, {
            method: "POST",
            credentials: "include",
            body: formdata,
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

export const checkIfArtExist = async (id: string, userId: any) => {
    const checkIfArtExist = getApiURL() + apiConfig.CHECK_IF_ART_EXIST_ENDPOINT;
    let requestBody = {
        id: id,
        userId: userId,
    };
    try {
        let response = await fetch(checkIfArtExist, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        console.log(result);
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'oeuvre d'art:", error);
        throw error;
    }
};
