export type Subcategory = {
    name: string;
    miniature: string;
};

export type Category = {
    id: string;
    name: string;
    subcategories: Subcategory[];
    miniatureLink: string;
    isShown: boolean;
};
export type NavigationCategory = {
    id: string;
    name: string;
    items: string[];
    miniatureLink: string;
    isShown: boolean;
};
