export interface Music {
    title: string;
    type: string;
    subType?: string;
    date?: Date;
    genres: string[];
    artist: string;
    album?: string;
    platforms?: string[];
    [key: string]: any;
}