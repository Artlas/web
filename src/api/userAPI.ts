import apiConfig from "./apiConfig.json";
import { getApiURL } from "./utilsAPI";
import { UserInfo } from "../components/userContext";

export const getUserInDatabase = async (password: string, userId?: string, mail?: string) => {
    const connectEndpoint = getApiURL() + apiConfig.LOGIN_USER_ENDPOINT;
    console.log(connectEndpoint);
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
            const result = await response.json();
            console.log(result);
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
            const result = await response.json();
            console.log(result);
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
/*
export const createUserInDatabase = async (userData: any) => {
    const createEndpoint = getApiURL() + apiConfig.REGISTER_USER_ENDPOINT;
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
};*/
export const createUserInDatabase = async (userData: any) => {
    const createEndpoint = getApiURL() + apiConfig.REGISTER_USER_ENDPOINT;
    let formdata = new FormData();
    console.log("Before API");
    console.log(userData);
    formdata.append("id", userData.id);
    formdata.append("mail", userData.mail);
    formdata.append("password", userData.password);
    formdata.append("firstName", userData.firstName);
    formdata.append("lastName", userData.lastName);
    formdata.append("birthdate", userData.birthdate);
    formdata.append("address", userData.address);
    formdata.append("image", userData.illustration[0]);
    formdata.append("favoritCat", userData.favoritCat);
    formdata.append("permission", userData.permission);

    try {
        const response = await fetch(createEndpoint, {
            method: "POST",
            credentials: "include",
            body: formdata,
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
    const deleteEndpoint = getApiURL() + apiConfig.DELETE_USER_ENDPOINT;
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
    const updateEndPoint = getApiURL() + apiConfig.UPDATE_USER_ENDPOINT;
    console.log(userData.username);

    let requestBody;
    if (userData.email == connectedUser.email && userData.username != connectedUser.username) {
        // je fais ma query par rapport a mon email de connected
        // check tt les autres parametres
        requestBody = {
            username: userData.username,
            email: connectedUser.email,
            password: userData.password,
            firstName: userData.fname,
            lastName: userData.lname,
            birthdate: userData.birthdate,
            address: userData.address,
        };
    }
    if (userData.email != connectedUser.email && userData.username == connectedUser.username) {
        // je fais ma query par rapport a mon id de connected
        // check tt les autres parametres
        requestBody = {
            username: connectedUser.username,
            email: userData.email,
            password: userData.password,
            firstName: userData.fname,
            lastName: userData.lname,
            birthdate: userData.birthdate,
            address: userData.address,
        };
    } else {
        requestBody = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            firstName: userData.fname,
            lastName: userData.lname,
            birthdate: userData.birthdate,
            address: userData.address,
        };
    }
    console.log(requestBody);
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
    const apiUrl = getApiURL() + apiConfig.CHECK_USER_ENDPOINT;
    console.log("id: ", id);
    console.log("mail: ", email);
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
            console.log(data.message || "Unexpected response from the server");
        }
    } catch (error) {
        console.error("Error checking if user exists:", error);
        throw error;
    }
};

export const updatePasswordUser = async (oldPassword: string, newPassword: string, user: any) => {
    const updatePasswordEndpoint = getApiURL() + apiConfig.UPDATE_USER_PASSWORD_ENDPOINT;
    let requestBody = {
        newPassword: newPassword,
        token: user.token,
        mail: user.email,
        password: oldPassword,
    };
    console.log(requestBody);
    try {
        const response = await fetch(updatePasswordEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l’utilisateur:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    const getAllUsersEndpoint = getApiURL() + apiConfig.GET_ALL_USERS_ENDPOINT;
    try {
        const response = await fetch(getAllUsersEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        throw error;
    }
};

export const retrieveInfoUserById = async (id: string) => {
    const retrieveInfoUserByIdEndpoint = getApiURL() + apiConfig.RETRIEVE_INFO_USER_BY_ID_ENDPOINT;
    let requestBody = {
        id: id,
    };
    try {
        const response = await fetch(retrieveInfoUserByIdEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        throw error;
    }
};
