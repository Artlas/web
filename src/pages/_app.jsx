import "../styles/globals.css";
import { UserProvider, UserContext } from "../components/userContext";
import { ThemeProvider } from "next-themes";
import LoginHandler from "../components/loginHandler";
import { useState, useContext } from "react";
import { CookiesProvider } from "react-cookie";

// Define a default UI theme
function MyApp({ Component, pageProps }) {
    const { user, userNeeded, connected } = useContext(UserContext);

    return (
        <CookiesProvider>
            <ThemeProvider attribute="class">
                <UserProvider>
                    <LoginHandler>
                        <Component {...pageProps} />
                    </LoginHandler>
                </UserProvider>
            </ThemeProvider>
        </CookiesProvider>
    );
}

export default MyApp;
