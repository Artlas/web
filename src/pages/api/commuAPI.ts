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
export const askFriend = async (id: string, user: any) => {
    const askFriendEndpoint = getApiURL() + apiConfig.ASK_BEFRIEND_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(askFriendEndpoint, {
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
        console.error("Erreur lors de la demande d'ami:", error);
        throw error;
    }
};

export const acceptFriend = async (id: string, user: any) => {
    const acceptFriendEndpoint = getApiURL() + apiConfig.ACCEPT_BEFRIEND_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(acceptFriendEndpoint, {
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
        console.error("Erreur lors de l'acceptation d'ami:", error);
        throw error;
    }
};

export const refuseFriend = async (id: string, user: any) => {
    const refuseFriendEndpoint = getApiURL() + apiConfig.REFUSE_BEFRIEND_ENDPOINT;
    let requestBody = {
        id: id,
        user: user,
    };
    try {
        let response = await fetch(refuseFriendEndpoint, {
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
        console.error("Erreur lors du refus d'ami:", error);
        throw error;
    }
};
