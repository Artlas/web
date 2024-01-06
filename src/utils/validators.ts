import { request } from "https";
import { createHash } from "crypto";

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
    const regex = /\b[A-Z0-9._-]+@[A-Z0-9][A-Z0-9.-]{0,61}[A-Z0-9]\.[A-Z.]{2,6}\b|^[a-zA-Z0-9._-]+$/;
    return regex.test(login.toLowerCase());
};

export const hashPasswordSha256 = (password: string): string => {
    return createHash("sha256").update(password).digest("hex");
};
