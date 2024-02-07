import React from "react";
import Link from "next/link";
import E404 from "./404";
import ListElement from "../components/listElement";
import { useState, useContext } from "react";
import { UserContext } from "../components/userContext";
import { useRouter } from "next/router";
import { FaUser, FaTableList, FaUserSlash, FaDoorOpen } from "react-icons/fa6";
import { FaUserFriends, FaCog } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";

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

    return connected ? (
        <div className={`container xl:max-w-4xl mx-auto bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-md border-2 border-solid  border-stone-200 dark:border-stone-800 py-4 ${""}`}>
            <div className="px-2 justify-center w-full">
                <ListElement icon={<FaUser className="mr-2" size={25} />} label="Profil" content={<IoMdArrowRoundForward size={30} />} href="/profile" />
                <ListElement icon={<FaUserFriends className="mr-2" size={25} />} label="Abonnements" content={<IoMdArrowRoundForward size={30} />} href="/abonnements" />
                <ListElement icon={<FaCog className="mr-2" size={25} />} label="Paramètres" content={<IoMdArrowRoundForward size={30} />} href="/settings" />
                <button id="mobileLogoutButton" type="button" onClick={() => handleLogout()} className="w-full text-red-700 dark:text-red-400">
                    <ListElement icon={<FaUserSlash className="mr-2" size={25} />} label="Déconnexion" content={<FaDoorOpen size={30} />} hideBar={true} />
                    <span className="sr-only">Déconnexion</span>
                </button>
            </div>
        </div>
    ) : (
        <E404 />
    );
}
