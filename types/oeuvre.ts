export type Oeuvre = {
        _id: string | number,
        title: string,
        description: string,
        category: string,
        subCategory: string,
        illustration?: string[],
        video?: string,
        postDate: Date,
        releaseDate?: Date,
        isMediaTypeImages: boolean,
        author: string,
        plateforme?: string, //? A supprimer ?
        likeCount: number,
        otherFields?: {
            genre?: string[], //? A supprimer ?
            artiste?: string, //? A supprimer ?
            realistateur?: string, //? A supprimer ?
            developpeur?: string, //? A supprimer ?
            editeur?: string, //? A supprimer ?
            compositeur?: string, //? A supprimer ?
            scenariste?: string, //? A supprimer ?
            producteur?: string, //? A supprimer ?
            acteurs?: string[], //? A supprimer ?
            toSell?: boolean,
            price?: number,
            linkToBuy?: string,
            canTchat?: boolean,
        },
    };