export interface Cinema {
    title: {[key: string]: any};
    type: string;
    subType?: string;
    date?: Date;
    genres: string[];
    director: string;
    actors?: string[];
    platforms?: string[];
    [key: string]: any;
}