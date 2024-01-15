import apiConfig from "./apiConfig.json";
import { UserInfo } from "../../components/userContext";

export const getUserInDatabase = async (password: string, userId?: string, mail?: string) => {
    const connectEndpoint = apiConfig.BASE_URL + apiConfig.LOGIN_ENDPOINT;
    async function getUserMail(password: string, mail: string) {
        let requestBody = {
            mail: mail,
            password: password,
        };
        try {
            let response = await fetch(connectEndpoint, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const result = await response.json(); // Analyse la réponse JSON
            if (result.error) {
                alert(result.error);
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error("Erreur lors de la vérification de l’utilisateur:", error);
            throw error;
        }
    }
    async function getUserId(password: string, id: string) {
        let requestBody = {
            id: userId,
            password: password,
        };
        try {
            const response = await fetch(connectEndpoint, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const result = await response.json(); // Analyse la réponse JSON
            if (result.error) {
                alert(result.error);
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error("Erreur lors de la vérification de l’utilisateur:", error);
            throw error;
        }
    }
    if (userId != null) {
        return await getUserId(password, userId);
    } else if (mail != null) {
        return await getUserMail(password, mail);
    } else {
        return null;
    }
};

//TODO
/**
 * Compléter les méthodes CRUD par rapport a NodeAPI pour la suite
 * getUserInDatabase &&  checkIfUserExists &&  createUserInDatabase OK
 */
export const createUserInDatabase = async (userData: any) => {
    const createEndpoint = apiConfig.BASE_URL + apiConfig.REGISTER_ENDPOINT;
    try {
        const response = await fetch(createEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création de l’utilisateur:", error);
        throw error;
    }
};

export const deleteUserInDatabase = async (userData: any) => {
    const deleteEndpoint = apiConfig.BASE_URL + apiConfig.DELETE_ENDPOINT;
    try {
        const response = await fetch(deleteEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression de l’utilisateur:", error);
        throw error;
    }
};

export const updateUserInDatabase = async (connectedUser: UserInfo, userData: any) => {
    const updateEndPoint = apiConfig.BASE_URL + apiConfig.UPDATE_ENDPOINT;

    //TODO
    /**
     * Recvoir un UserInfo, le comparer le UserInfo de la session, en fonction de
     *  envoyer les parametres a modifier avec l'id de userInfo de base de la session
     * Préparer nodeApi pour recevoir ce genre de requete
     */
    /*const newUser : UserInfo{

    }*/
    let requestBody = {
        mail: userData.mail,
        password: userData.password,
    };
    try {
        const response = await fetch(updateEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(id, ...userData),
            // REVOIR LA METHODE DU BODY
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l’utilisateur:", error);
        throw error;
    }
};

export const checkIfUserExists = async (email: any, id: any) => {
    const apiUrl = apiConfig.BASE_URL + apiConfig.CHECK_ENDPOINT;
    const body = JSON.stringify({ mail: email, id: id });
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
        const data = await response.json();
        if (response.status === 200) {
            return { userExists: true, message: data.message };
        } else if (response.status === 404) {
            return { userExists: false, message: data.message };
        } else {
            throw new Error(data.message || "Unexpected response from the server");
        }
    } catch (error) {
        console.error("Error checking if user exists:", error);
        throw error;
    }
};
