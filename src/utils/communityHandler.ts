import { getApiURL } from "../api/utilsAPI";
import apiConfig from "../api/apiConfig.json";
import { UserInfo } from "../components/userContext";
import { retrieveFollowedArtistsFromDB } from "../api/commuAPI";

export const retrieveFollowedArtists = async (userId: string) => {
    const followedArtists = await retrieveFollowedArtistsFromDB(userId);

    // Créer un nouveau tableau contenant seulement l'id et l'image de chaque artiste
    const artistsData = followedArtists.map((artist: any) => ({
        id: artist.username,
        image: artist.image,
    }));

    return artistsData;
};
