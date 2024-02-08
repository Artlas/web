import { getApiURL } from "../api/utilsAPI";
import apiConfig from "../api/apiConfig.json";
import { UserInfo } from "../components/userContext";
import { retrieveFollowedArtistsFromDB } from "../api/commuAPI";

export const retrieveFollowedArtists = async (userId: string) => {
    const followedArtists = await retrieveFollowedArtistsFromDB(userId);
    try {
        if (followedArtists != undefined && followedArtists != null) {
            const artistsData = followedArtists.map((artist: any) => ({
                id: artist.id,
                image: artist.image,
                following: artist.folowing,
                gallery: artist.gallery,
                likedPosts: artist.likedPosts,
                favoritCat: artist.favoritCat,
            }));
            return artistsData;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error);
    }

    // Créer un nouveau tableau contenant seulement l'id et l'image de chaque artiste
};
