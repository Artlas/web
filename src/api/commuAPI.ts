import { getApiURL } from "./utilsAPI";
import apiConfig from "./apiConfig.json";

export const followArtist = async (id: string, user: any) => {
    const followArtistEndpoint = getApiURL() + apiConfig.FOLLOW_ARTIST_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(followArtistEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("Erreur lors du follow de l'artiste:", error);
        throw error;
    }
};
export const unfollowArtist = async (id: string, user: any) => {
    const unfollowArtistEndpoint = getApiURL() + apiConfig.UNFOLLOW_ARTIST_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(unfollowArtistEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
    } catch (error) {
        console.error("Erreur lors du follow de l'artiste:", error);
        throw error;
    }
};

export const retrieveFollowedArtistsFromDB = async (userId: string) => {
    const retrieveFollowedArtistsEndpoint = getApiURL() + apiConfig.RETRIEVE_FOLLOWED_ARTISTS_ENDPOINT;
    let requestBody = {
        userId: userId,
    };
    try {
        let response = await fetch(retrieveFollowedArtistsEndpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes suivis:", error);
        throw error;
    }
};
