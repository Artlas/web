import React, { createContext, useState } from "react";
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
}

// Define the type for the user information
interface UserInfo {
    username: string;
    email: string;
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
});

// Create a provider component to wrap your app with the user context
export const UserProvider: React.FC = ({ children }: any) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [userNeeded, setUserNeeded] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);
    const [signup, setSignup] = useState<boolean>(false);

    // Function to handle user login
    const login = (username: string, password: string) => {
        // Perform login logic here, e.g. making an API call
        // Once the login is successful, update the user state
        const user: UserInfo = {
            username,
            email: "example@example.com",
            // Set other user properties as needed
        };
        setUser(user);
        setConnected(true);
        setSignup(false);

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

    return <UserContext.Provider value={{ user, login, logout, userNeeded, setUserNeeded, connected, signup, setSignup }}>{children}</UserContext.Provider>;
};
