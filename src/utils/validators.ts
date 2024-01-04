import { request } from "https";
import {createHash} from "crypto";

// validators.ts
export const validatePassword = (password: string): boolean => {
    // Implémentation de la validation du mot de passe
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
};

export const validateLogin = (login: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9._-]+$/;
    if (regex.test(login)) return false;
    else return true;
};

export const checkUserInDatabase = async (password: string, userId?: string, mail?: string) => {
    // requete -> check user  -> connection
    async function getUserMail(password: string, mail: string) {
        let response = await fetch("http://api.fournierfamily.ovh/user/connect", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({
                    mail: mail,
                    password: password,
                }),
            },
        });
        const result = await response.json(); // Analyse la réponse JSON

        if (result.error) {
            alert(result.error)
            throw new Error(result.error); // Lance une exception si un champ 'error' est présent
        }
        return response;
    }
    async function getUserId(password: string, id: string) {
        let response = await fetch("http://api.fournierfamily.ovh/user/connect", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({
                    id: id,
                    password: password,
                }),
            },
        });
        const result = await response.json(); // Analyse la réponse JSON
        if (result.error) {
            alert(result.error)
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
};

export const hashPasswordSha256 = (password: string): string =>{
    return createHash("sha256").update(password).digest("hex");
};

