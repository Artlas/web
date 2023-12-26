import { UserContext } from "./userContext";
import Layout from "./layout";
import Login from "../pages/login";
import { useState, useContext } from "react";

export default function LoginHandler({ children }: { children: React.ReactNode }) {
    const { user, userNeeded, connected } = useContext(UserContext);
    return userNeeded && !connected ? <Login></Login> : <Layout>{children}</Layout>;
}
