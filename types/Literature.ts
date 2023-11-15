export interface Literature {
    title: string;
    type: string;
    subType?: string;
    date?: Date;
    genre: string[];
    author: string;
    publisher?: string;
    platforms?: string[];
    [key: string]: any;
}