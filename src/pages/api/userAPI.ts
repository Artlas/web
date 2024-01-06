import apiConfig from "./apiConfig.json";

export const checkUserInDatabase = async (password: string, userId?: string, mail?: string) => {
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
 * Compléter les méthodes C U D par rapport a NodeAPI pour la suite
 */
export const createUserInDatabase = async (userData: any) => {
    const createEndpoint = apiConfig.BASE_URL + apiConfig.REGISTER_ENDPOINT;
    try {
        const response = await fetch(createEndpoint, {
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

export const updateUserInDatabase = async (id: string, userData: any) => {
    const updateEndPoint = apiConfig.BASE_URL + apiConfig.UPDATE_ENDPOINT;
    try {
        const response = await fetch(updateEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id, ...userData),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l’utilisateur:", error);
        throw error;
    }
};
