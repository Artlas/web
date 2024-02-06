import { getArtsBasedOnIDFromDb, getArtLikedByUser } from "../api/artAPI";

export const getArtOfArtistBasedOnId = async (id: string) => {
    const artByArtist = await getArtsBasedOnIDFromDb(id);
    console.log(artByArtist);
    return artByArtist;
};
export const retrieveArtLikedByUser = async (userId: string) => {
    const artLikedByArtist = await getArtLikedByUser(userId);
    console.log(artLikedByArtist);
    return artLikedByArtist;
};
