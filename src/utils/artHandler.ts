import { getArtsBasedOnIDFromDb } from "../api/artAPI";

export const getArtOfArtistBasedOnId = async (id: string) => {
    const artByArtist = await getArtsBasedOnIDFromDb(id);
    return artByArtist;
};
