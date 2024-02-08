import { getArtsBasedOnIDFromDb, getArtLikedByUser } from "../api/artAPI";

export const getArtOfArtistBasedOnId = async (id: string) => {
    const artByArtist = await getArtsBasedOnIDFromDb(id);
    if (artByArtist === undefined) {
        return undefined;
    } else {
        return artByArtist;
    }
};
export const retrieveArtLikedByUser = async (userId: string) => {
    const artLikedByArtist = await getArtLikedByUser(userId);

    if (artLikedByArtist === undefined) {
        return undefined;
    } else {
        return artLikedByArtist;
    }
};
