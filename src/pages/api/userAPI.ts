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

export const updateUserInDatabase = async (userData: any, connectedUser: any) => {
    const updateEndPoint = apiConfig.BASE_URL + apiConfig.UPDATE_ENDPOINT;

    //TODO
    let requestBody;
    if (userData.email == connectedUser.email && userData.id != connectedUser.username) {
        // je fais ma query par rapport a mon email de connected
        // check tt les autres parametres
        requestBody = {
            username: userData.id,
            email: connectedUser.email,
            password: userData.password,
            firstName: userData.fname,
            lastName: userData.lname,
            birthdate: userData.birthdate,
            address: userData.address,
        };
    }
    if (userData.email != connectedUser.email && userData.id == connectedUser.username) {
        // je fais ma query par rapport a mon id de connected
        // check tt les autres parametres
        requestBody = {
            username: connectedUser.id,
            email: userData.email,
            password: userData.password,
            firstName: userData.fname,
            lastName: userData.lname,
            birthdate: userData.birthdate,
            address: userData.address,
        };
    } else {
        requestBody = {
            username: userData.id,
            email: userData.email,
            password: userData.password,
            firstName: userData.fname,
            lastName: userData.lname,
            birthdate: userData.birthdate,
            address: userData.address,
        };
    }
    /**
     * Recvoir un UserInfo, le comparer le UserInfo de la session, en fonction de
     *  envoyer les parametres a modifier avec l'id de userInfo de base de la session
     * Préparer nodeApi pour recevoir ce genre de requete
     */
    /*const newUser : UserInfo{

    }*/

    try {
        const response = await fetch(updateEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
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
