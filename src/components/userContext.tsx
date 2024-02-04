import React, { createContext, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useCookies } from "react-cookie";
// Define the initial state for the user context
interface UserContextState {
    user: UserInfo | null;
    login: (user: UserInfo) => void;
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
export interface UserInfo {
    _id: string;
    username: string;
    email: string;
    fname?: string;
    lname?: string;
    image?: string;
    address?: string;
    birthdate?: Date | string;
    token: string;
    permission: string;
    acceptCookies?: boolean;
    autoPlayDiaporamas?: boolean;
    preferredTheme?: string;
    friends?: string[];
    gallery?: string[];
    lists?: [_id: string, title: string, description: string, arts: string[]];
    liked?: string[];
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
    const [cookies, setCookie, removeCookie] = useCookies(["UserInfo"]);
    useEffect(() => {
        if (cookies.UserInfo) {
            setUser(cookies.UserInfo);
            setConnected(true);
        }
    }, [cookies, user?.username]);
    // Function to handle user login

    const login = (user: UserInfo) => {
        /* user.acceptCookies: true,
        user.autoPlayDiaporamas: true,
        user.preferredTheme: "system", //"light",*/
        setUser(user);
        setConnected(true);
        setSignup(false);
        setCookie("UserInfo", user, { path: "/", maxAge: 1800 });
        setAcceptCookies(user.acceptCookies || false);
        setAutoPlayDiaporamas(user.autoPlayDiaporamas || false);
        setPreferredTheme(user.preferredTheme || "system");
        setTheme(user.preferredTheme || "system");

        console.log("Login successful with username: " + user.username + " and email: " + user.email);
        console.log("User info: ", user);
    };
    const ssoLogin = (userInfo: UserInfo) => {
        setUser(userInfo);
        setConnected(true);
        setSignup(false);
        console.log("Connexion SSO réussie:", userInfo);
    };

    // Function to handle user logout
    const logout = () => {
        // Perform logout logic here, e.g. clearing session data
        // Once the logout is successful, update the user state to null
        setUser(null);
        setUserNeeded(false);
        setConnected(false);
        removeCookie("UserInfo", { path: "/", maxAge: 0 });
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
