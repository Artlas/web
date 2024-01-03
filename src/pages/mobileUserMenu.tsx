import React from "react";
import Link from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "../components/userContext";
import { useRouter } from "next/router";

type Props = {};

export default function MobileUserMenu({}: Props) {
    const { user, userNeeded, connected, logout } = useContext(UserContext);

    let router = useRouter();
    function redirect() {
        router.push("/");
    }

    const handleLogout = () => {
        logout();
        console.log("Logout successful");
        redirect();
    };

    return (
        <div
            className={`flex ${""} w-full justify-center bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-md border-2 border-solid  border-stone-200 dark:border-stone-800 z-50 overflow-hidden`}
        >
            <div className="py-1 justify-center w-full">
                <Link href="/profile" className="block px-24 py-4 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 justify-center text-center">
                    Profil
                </Link>
                <hr className=" border-stone-300 dark:border-stone-700" />
                <Link href="/friends" className="block px-24 py-4 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 justify-center text-center">
                    Mes amis
                </Link>
                <hr className=" border-stone-300 dark:border-stone-700" />
                <Link href="/mylists" className="block px-24 py-4 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 justify-center text-center">
                    Mes listes
                </Link>
                <hr className=" border-stone-300 dark:border-stone-700" />
                <Link href="/settings" className="block px-24 py-4 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 justify-center text-center">
                    Paramètres
                </Link>
                <hr className=" border-stone-300 dark:border-stone-700" />
                <button
                    id="mobileLogoutButton"
                    type="button"
                    className="block px-24 py-4 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 justify-center text-center mx-auto"
                    onClick={() => handleLogout()}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
}
