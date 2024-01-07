import "../styles/globals.css";
import { UserProvider, UserContext } from "../components/userContext";
import { ThemeProvider } from "next-themes";
import LoginHandler from "../components/loginHandler";
import { useState, useContext } from "react";

// Define a default UI theme
function MyApp({ Component, pageProps }) {
    const { user, userNeeded, connected } = useContext(UserContext);

    return (
        <ThemeProvider attribute="class">
            <UserProvider>
                <LoginHandler>
                    <Component {...pageProps} />
                </LoginHandler>
            </UserProvider>
        </ThemeProvider>
    );
}

export default MyApp;
