import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface ArtContextState {
    art: ArtInfo | null;
    setArt: (art: ArtInfo) => void;
}
export interface ArtInfo {
    id: number;
    title: string;
    categorie: string;
    subCategorie: string;
    description: string;
    image_url?: string;
    video_url?: string;
    creation_date?: Date;
    onSale?: boolean;
    price?: number;
    artistId: string;
}

export const ArtContext = createContext<ArtContextState>({
    art: null,
    setArt: () => {},
});
export const ArtProvider: React.FC = ({ children }: any) => {
    const [art, setArt] = useState<ArtInfo | null>(null);
    return <ArtContext.Provider value={{ art, setArt }}>{children}</ArtContext.Provider>;
};
