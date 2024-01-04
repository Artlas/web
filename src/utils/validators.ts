import { request } from "https";

// validators.ts
export const validatePassword = (password: string): boolean => {
    // Implémentation de la validation du mot de passe
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars
    );
};

export const validateLogin = (login: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9._-]+$/;
    if (regex.test(login))
        return false;
    else
        return true;
};

export const checkUserInDatabase = async (password: string, userId?: string, mail?:string) => {
    // requete -> check user  -> connection
    async function getUserMail(password: string, mail: string) {
        let value = await fetch("http://api.fournierfamily.ovh/user/connect",
            {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    body: JSON.stringify({
                        "mail": mail,
                        "password": password,
                    }),
                }
            })
        return value;
    }
    async function getUserId(password:string, id:string) {
        let value = await fetch("http://api.fournierfamily.ovh/user/connect",
            {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    body: JSON.stringify({
                        "id": id,
                        "password": password,
                    }),
                }
            })
        if(!value.ok)
            throw new Error("Error: ${value.status}")
        return value;
    }
    if(userId!=null){
        return await getUserId(password,userId);
    }
    else if( mail!=null) {
        return await getUserMail(password,mail);
    }
    else{
        return null
    }
};
