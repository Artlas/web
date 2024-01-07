import React, { createContext, useState } from "react";
import { useTheme } from "next-themes";
// Define the initial state for the user context
interface UserContextState {
    user: UserInfo | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    userNeeded: boolean;
    setUserNeeded: (value: boolean) => void;
    connected: boolean;
    signup: boolean;
    setSignup: (value: boolean) => void;
    acceptCookies: boolean;
    setAcceptCookies: (value: boolean) => void;
    autoPlayDiaporamas: boolean;
    setAutoPlayDiaporamas: (value: boolean) => void;
    preferredTheme: string;
    setPreferredTheme: (value: string) => void;
}

// Define the type for the user information
interface UserInfo {
    username: string;
    email: string;
    familyName: string;
    name: string;
    birthdate?: Date | string;
    address?: string;
    acceptCookies: boolean;
    autoPlayDiaporamas?: boolean;
    avatar?: string;
    preferredTheme?: string;
    //TODO: Add any other properties you need for the user
}

// Create the user context
export const UserContext = createContext<UserContextState>({
    user: null,
    login: () => {},
    logout: () => {},
    userNeeded: false,
    setUserNeeded: () => {},
    connected: false,
    signup: false,
    setSignup: () => {},
    acceptCookies: false,
    setAcceptCookies: () => {},
    autoPlayDiaporamas: false,
    setAutoPlayDiaporamas: () => {},
    preferredTheme: "system",
    setPreferredTheme: () => {},
});

// Create a provider component to wrap your app with the user context
export const UserProvider: React.FC = ({ children }: any) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [userNeeded, setUserNeeded] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);
    const [signup, setSignup] = useState<boolean>(false);
    const [acceptCookies, setAcceptCookies] = useState<boolean>(false);
    const [autoPlayDiaporamas, setAutoPlayDiaporamas] = useState<boolean>(false);
    const [preferredTheme, setPreferredTheme] = useState<string>("system");
    const { setTheme } = useTheme();

    // Function to handle user login
    const login = (username: string, password: string) => {
        // Perform login logic here, e.g. making an API call
        // Once the login is successful, update the user state
        const user: UserInfo = {
            username,
            email: "example@example.com",
            familyName: "Doe",
            name: "John",
            birthdate: "1990-01-01",
            address: "1, rue de la Paix, 75000 Paris",
            acceptCookies: true,
            autoPlayDiaporamas: true,
            avatar: "https://picsum.photos/200",
            preferredTheme: "system", //"light",
            // Set other user properties as needed
        };
        if (username === "") user.username = "Anonymous";
        setUser(user);
        setConnected(true);
        setSignup(false);
        setAcceptCookies(user.acceptCookies || false);
        setAutoPlayDiaporamas(user.autoPlayDiaporamas || false);
        setPreferredTheme(user.preferredTheme || "system");
        setTheme(user.preferredTheme || "system");

        console.log("Login successful with username: " + username + " and password: " + password + "");
        console.log("User info: ", user);
    };

    // Function to handle user logout
    const logout = () => {
        // Perform logout logic here, e.g. clearing session data
        // Once the logout is successful, update the user state to null
        setUser(null);
        setUserNeeded(false);
        setConnected(false);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
                userNeeded,
                setUserNeeded,
                connected,
                signup,
                setSignup,
                acceptCookies,
                setAcceptCookies,
                autoPlayDiaporamas,
                setAutoPlayDiaporamas,
                preferredTheme,
                setPreferredTheme,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
