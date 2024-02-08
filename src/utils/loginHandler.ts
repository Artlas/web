import { UserInfo } from "../components/userContext";
import { getUserInDatabase } from "../api/userAPI";

export function setConnectedUser(userData: any): UserInfo {
    let connectedUser: UserInfo = {
        _id: userData?._id ?? "",
        username: userData?.id ?? "",
        email: userData?.mail ?? "",
        fname: userData?.firstName ?? "",
        lname: userData?.lastName ?? "",
        image: userData?.image ?? "",
        address: userData?.address ?? "",
        birthdate: userData?.birthdate ?? "",
        token: userData?.token ?? "",
        permission: userData?.permission ?? "",
        following: userData?.folowing ?? "",
        gallery: userData?.gallery ?? "",
        lists: userData?.lists ?? "",
        liked: userData?.likedPosts ?? "",
        favoritCat: userData?.favoritCat ?? "",
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

        if (!data) {
            throw new Error("Aucune donnée utilisateur retournée");
        }

        const connectedUser: UserInfo = setConnectedUser(data);

        return connectedUser;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        throw error; // Propager l'erreur
    }
}
