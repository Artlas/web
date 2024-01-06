import apiConfig from "./apiConfig.json";
/*
export const checkUserInDatabase = async (password: string, userId?: string, mail?: string) => {
    // requete -> check user  -> connection
    const connectEndpoint = apiConfig.BASE_URL + apiConfig.LOGIN_ENDPOINT;
    let queryParams = new URLSearchParams();
    if (userId != null) {
        queryParams.append("id", userId);
    } else if (mail != null) {
        queryParams.append("mail", mail);
    }
    queryParams.append("password", password);

    const connectEndpointWithParams = `${apiConfig.BASE_URL + apiConfig.LOGIN_ENDPOINT}?${queryParams}`;
    console.log("endpoint:" ,connectEndpointWithParams)
    async function getUserMail(password: string, mail: string) {
        console.log("In getusermail")
        let response = await fetch(connectEndpointWithParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json(); // Analyse la réponse JSON
        console.log("INFOS: ", result);
        if (result.error) {
            alert(result.error);
            throw new Error(result.error); // Lance une exception si un champ 'error' est présent
        }
        return response;
    }
    async function getUserId(password: string, id: string) {
        console.log("In getUserid")
        let response = await fetch(connectEndpointWithParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json(); // Analyse la réponse JSON
        console.log("INFOS: ", result);
        if (result.error) {
            alert(result.error);
            throw new Error(result.error); // Lance une exception si un champ 'error' est présent
        }
        return response;
    }
    if (userId != null) {
        return await getUserId(password, userId);
    } else if (mail != null) {
        return await getUserMail(password, mail);
    } else {
        return null;
    }
};*/

export const checkUserInDatabase = async (password: string, userId?: string, mail?: string) => {
    const connectEndpoint = apiConfig.BASE_URL + apiConfig.LOGIN_ENDPOINT;
    console.log("CHECK 1");
    console.log("ENDPOINT: ", connectEndpoint);

    async function getUserMail(password: string, mail: string) {
        let requestBody = {
            mail: mail,
            password: password,
        };
       
        console.log("In getusermail");
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
            console.log("INFOS: ", result);
            if (result.error) {
                alert(result.error);
                throw new Error(result.error); // Lance une exception si un champ 'error' est présent
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
        console.log("In getUserid");
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
            console.log("INFOS: ", result);
            if (result.error) {
                alert(result.error);
                throw new Error(result.error); // Lance une exception si un champ 'error' est présent
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

// Fonction pour delete
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
