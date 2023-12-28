import React, { useContext, useState } from "react";
import { UserContext } from "../components/userContext";
import { FaGithub, FaMicrosoft, FaGoogle, FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
    const { login, setSignup, setUserNeeded } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let router = useRouter();
    function redirect() {
        router.push("/");
    }

    const handleLogin = () => {
        // TODO: Perform login logic here
        login(username, password);
        console.log("Login successful with username: " + username + " and password: " + password + "");
    };

    const loginGoogle = () => {
        // TODO: Perform Google login logic here
        console.log("Login with Google");
    };

    const loginMicrosoft = () => {
        // TODO: Perform Microsoft login logic here
        console.log("Login with Microsoft");
    };

    const loginGithub = () => {
        // TODO: Perform GitHub login logic here
        console.log("Login with GitHub");
    };

    const handleCloseLogin = () => {
        setUserNeeded(false);
        redirect();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
            <div className="bg-white dark:bg-stone-900 p-2 rounded shadow-md">
                <button
                    id="loginCloseButton"
                    className=" dark:bg-black bg-stone-100 dark:border-black border-white dark:hover:bg-stone-800 hover:bg-stone-200 dark:text-white text-black px-3 py-2 rounded-full"
                    onClick={() => handleCloseLogin()}
                    type="button"
                >
                    <div>
                        <FaArrowLeft className="inline-block mb-1" />
                        <span className="ml-2">Revenir à Artlas</span>
                    </div>
                </button>
                <div className="px-6 pb-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
                    <form className="space-y-4 mb-2 ">
                        <div>
                            <label htmlFor="login" className="block font-medium">
                                Identifiant
                            </label>
                            <input
                                id="usernameLoginInput"
                                type="text"
                                placeholder="Identifiant"
                                className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium">
                                Mot de passe
                            </label>
                            <input
                                id="passwordLoginInput"
                                type="password"
                                placeholder="Mot de passe"
                                className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col justify-between items-center">
                            <button
                                id="loginLoginButton"
                                type="button" //! Shoud be "submit" but causes a page reload
                                className="bg-black dark:bg-white border-2 rounded-md py-2 px-4 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                                onClick={handleLogin}
                            >
                                Se connecter
                            </button>
                        </div>
                    </form>
                    <p className="mb-2">
                        {"Vous n'avez pas de compte ? "}
                        <button type="button" onClick={() => setSignup(true)}>
                            <span className="text-blue-600 dark:text-sky-300 visited:text-indigo-400 hover:border-b hover:border-blue-600 dark:hover:border-sky-300 hover:visited:border-indigo-400 cursor-pointer">
                                Créer un compte
                            </span>
                        </button>
                    </p>
                    <hr></hr>
                    <div className="flex flex-col items-center mt-4 space-y-2">
                        <button id="loginGoogleButton" className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600" onClick={loginGoogle} type="button">
                            <div>
                                <FaGoogle className="inline-block" />
                                <span className="ml-2">Se connecter avec Google</span>
                            </div>
                        </button>
                        <button id="loginMicrosoftButton" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600" onClick={loginMicrosoft} type="button">
                            <div>
                                <FaMicrosoft className="inline-block" />
                                <span className="ml-2">Se connecter avec Microsoft</span>
                            </div>
                        </button>
                        <button
                            id="loginGithubButton"
                            className="text-white bg-black rounded-md shadow-md hover:bg-gray-900 dark:active:bg-gray-950 dark:active:border-2 dark:active:border-black cursor-pointer p-2 xl:p-3"
                            onClick={loginGithub}
                            type="button"
                        >
                            <div>
                                <FaGithub className="inline-block" />
                                <span className="ml-2">Se connecter avec GitHub</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
