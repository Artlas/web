import "../styles/globals.css";
import { UserProvider, UserContext } from "../components/userContext";
import LoginHandler from "../components/loginHandler";
import Layout from "../components/layout";
import Login from "./login";
import { useState, useContext } from "react";

// Define a default UI theme
function MyApp({ Component, pageProps }) {
    const { user, userNeeded, connected } = useContext(UserContext);

    return (
        <UserProvider>
            <LoginHandler>
                <Component {...pageProps} />
            </LoginHandler>
        </UserProvider>
    );
}

export default MyApp;
