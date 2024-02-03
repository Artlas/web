import React, { createContext, useState } from "react";
import { Oeuvre } from "../../types/oeuvre";

interface ArtContextState {
    oeuvre: Oeuvre | null;
    setOeuvre: (oeuvre: Oeuvre) => void;
}

export const ArtContext = createContext<ArtContextState>({
    oeuvre: null,
    setOeuvre: () => {},
});

export const ArtProvider: React.FC = ({ children }: any) => {
    const [oeuvre, setOeuvre] = useState<Oeuvre | null>(null);

    return <ArtContext.Provider value={{ oeuvre, setOeuvre }}>{children}</ArtContext.Provider>;
};
//? Ne sait pas encore si ca va servir
