import "../styles/globals.css";
import Layout from "../components/layout";
import { useState } from "react";
// Page par défaut de l'application comprenant les éléments communs à toutes les pages
function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
