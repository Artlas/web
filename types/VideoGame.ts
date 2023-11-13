export interface VideoGame {
    title: string;
    type: string;
    subType?: string;
    date?: Date;
    genre: string[];
    developer: string[];
    publisher: string[];
    platforms?: string[];
    [key: string]: any;
}