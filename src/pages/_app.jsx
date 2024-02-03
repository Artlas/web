import "../styles/globals.css";
import { UserProvider, UserContext } from "../components/userContext";
import { ThemeProvider } from "next-themes";
import LoginHandler from "../components/loginHandler";
import { useState, useContext } from "react";
import { CookiesProvider } from "react-cookie";
import { CategoryProvider } from "../components/categoryContext";

// Define a default UI theme
function MyApp({ Component, pageProps }) {
    const { user, userNeeded, connected } = useContext(UserContext);

    return (
        <CookiesProvider>
            <ThemeProvider attribute="class">
                <CategoryProvider>
                    <UserProvider>
                        <LoginHandler>
                            <Component {...pageProps} />
                        </LoginHandler>
                    </UserProvider>
                </CategoryProvider>
            </ThemeProvider>
        </CookiesProvider>
    );
}

export default MyApp;
