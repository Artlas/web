export type Oeuvre = {
    _id: string | number;
    title: string;
    description: string;
    category: string;
    subCategory: string;
    illustration?: string[];
    video?: string;
    postDate: Date | string;
    releaseDate?: Date | string;
    isMediaTypeImages: boolean;
    author: string;
    likeCount: number;
    toSell?: boolean;
    price?: number;
    linkToBuy?: string;
    canTchat?: boolean;
};
