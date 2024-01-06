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

export const hashPasswordSha256 = (password: string): string =>{
    return createHash("sha256").update(password).digest("hex");
};

