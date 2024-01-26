import React from "react";
import E404 from "./404";
import ListElement from "../components/listElement";
import { useContext } from "react";
import { UserContext } from "../components/userContext";
import { useRouter } from "next/router";
import { FaTableList } from "react-icons/fa6";
import { IoMdArrowRoundForward } from "react-icons/io";
import { GiMonaLisa } from "react-icons/gi";
import { RiGalleryLine } from "react-icons/ri";
import Link from "next/link";

type Props = {};

export default function CreationMenu({}: Props) {
    const { user, userNeeded, setUserNeeded, connected, logout } = useContext(UserContext);

    setUserNeeded(true);
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
        <div className={`flex flex-col md:flex-row px-2 justify-between w-full lg:max-w-7xl mx-auto py-4 md:space-x-4 xl:space-x-8 space-y-3 md:space-y-0 ${""}`}>
            <Link
                href="poster"
                className="flex flex-col bg-stone-100 dark:bg-stone-950 text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 rounded-xl border-2 border-solid  border-stone-200 dark:border-stone-800 py-4 w-full lg:max-w-md"
            >
                <GiMonaLisa className="mx-auto" size={100} />
                <span className="text-center">Nouveau post</span>
            </Link>
            <Link
                href="newList"
                className="flex flex-col bg-stone-100 dark:bg-stone-950 text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 rounded-xl border-2 border-solid  border-stone-200 dark:border-stone-800 py-4 w-full lg:max-w-md"
            >
                <FaTableList className="mx-auto" size={100} />
                <span className="text-center">Nouvelle liste</span>
            </Link>
            <Link
                href="editGalerie"
                className="flex flex-col bg-stone-100 dark:bg-stone-950 text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 rounded-xl border-2 border-solid  border-stone-200 dark:border-stone-800 py-4 w-full lg:max-w-md"
            >
                <RiGalleryLine className="mx-auto" size={100} />
                <span className="text-center">Editer mes galeries</span>
            </Link>
        </div>
    ) : (
        <E404 />
    );
}
