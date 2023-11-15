export interface Photography {
    title: string;
    type: string;
    subType?: string;
    date?: Date;
    genre: string[];
    artist: string;
    platforms?: string[];
    exhibitions?: string[];
    [key: string]: any;
}