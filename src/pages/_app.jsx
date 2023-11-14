import "../styles/globals.css";
import Layout from "../components/layout";
import { useState } from "react";

// Define a default UI theme
function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
