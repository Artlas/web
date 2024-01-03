import { UserContext } from "./userContext";
import Layout from "./layout";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { useContext } from "react";

export default function LoginHandler({ children }: { children: React.ReactNode }) {
    const { user, userNeeded, connected, signup } = useContext(UserContext);
    return userNeeded && !connected ? signup ? <Signup /> : <Login /> : <Layout>{children}</Layout>;
}
