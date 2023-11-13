export interface PerformingArts {
    title: string;
    type: string;
    subType?: string;
    date?: Date;
    genre: string[];
    performances?: string[];
    locations?: string[];
    [key: string]: any;
}