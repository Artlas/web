import { UserInfo } from "../components/userContext";
import { getUserInDatabase } from "../pages/api/userAPI";

export function setConnectedUser(userData: any): UserInfo {
    let connectedUser: UserInfo = {
        username: userData?.id ?? "",
        email: userData?.mail ?? "",
        fname: userData?.firstName ?? "",
        lname: userData?.lastName ?? "",
        image: userData?.image ?? "",
        address: userData?.address ?? "",
        birthdate: userData?.birthdate ?? "",
        token: userData?.token ?? "",
        permission: userData?.permission ?? "",
    };
    return connectedUser;
}
export async function connectUser(hashedPassword: string, username?: string, email?: string): Promise<UserInfo | undefined> {
    try {
        let data;
        if (email) {
            // Supposons que getUserInDatabase attend (hashedPassword, username, email)
            data = await getUserInDatabase(hashedPassword, undefined, email);
        } else if (username) {
            data = await getUserInDatabase(hashedPassword, username, undefined);
        } else {
            throw new Error("Email et username sont nuls");
        }

        if (!data || !data.user) {
            throw new Error("Aucune donnée utilisateur retournée");
        }

        const connectedUser: UserInfo = setConnectedUser(data.user);
        return connectedUser;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        throw error; // Propager l'erreur
    }
}

// export async function connectUser(hashedPassword: string, username?: string, email?: string) {
//     let connectedUser: UserInfo;
//     if (email != null) {
//         checkUserInDatabase(hashedPassword, email, undefined)
//             .then((data) => {
//                 console.log("email:", email);
//                 const userData = data.user;
//                 connectedUser = setConnectedUser(userData);
//                 //login(connectedUser);
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la récupération de l'utilisateur:", error);
//                 // Gérer l'erreur
//             });
//     }
//     if (username != null) {
//         checkUserInDatabase(hashedPassword, undefined, username)
//             .then((data) => {
//                 console.log("username:", username);
//                 const userData = data.user;
//                 connectedUser = setConnectedUser(userData);
//                 //login(connectedUser);
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la récupération de l'utilisateur:", error);
//                 // Gérer l'erreur
//             });
//     }
//     return connectedUser;
// }
