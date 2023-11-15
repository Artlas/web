import SideNavigation from "./sideNavigation";
import SearchBar from "./searchbar";
import Image from "next/image";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import { FaCompass, FaRegCompass, FaUser, FaRegUser } from "react-icons/fa6";
import { HiLibrary, HiOutlineLibrary } from "react-icons/hi";
import { PiPlusBold, PiPlus } from "react-icons/pi";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    let name = useRouter().pathname.split("/")[1];
    const currentCategory = useRouter().query.category;
    const currentSubCategory = useRouter().query.subcategory;
    if (name[0] === "[") {
        if (currentCategory && currentSubCategory) {
            if (currentSubCategory !== "all") name = currentCategory + " / " + currentSubCategory;
            else name = String(currentCategory);
        }
    }
    const [sectionName, setSectionName] = useState(name || "Artlas");
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        setSectionName(name || "Artlas");
    }, [name]);
    const [sidePanel, setSidePanel] = useState(true);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileUserMenu, setMobileUserMenu] = useState(false);

    const handleUserMenu = () => {
        setUserMenu(!userMenu);
    };

    const handleMobileUserMenu = () => {
        setMobileUserMenu(!mobileUserMenu);
    };

    //TODO: Nav bar

    const navigationInfo = {
        categories: [
            {
                name: "cinema",
                items: ["all", "films", "series", "courts-metrages"],
                isShown: false,
            },
            {
                name: "musique",
                items: ["all", "musiques", "albums", "artistes"],
                isShown: false,
            },
            {
                name: "arts plastiques",
                items: ["all", "peintures", "sculptures", "dessins", "gravures"],
                isShown: false,
            },
            {
                name: "arts de la scene",
                items: ["all", "theatre", "danse", "opera", "cirque"],
                isShown: false,
            },
            {
                name: "litterature",
                items: ["all", "livres", "romans", "poesie", "bandes dessinees", "mangas"],
                isShown: false,
            },
            {
                name: "photographie",
                items: ["all", "photos", "photographes"],
                isShown: false,
            },
            {
                name: "architecture",
                items: ["all", "batiments", "architectes"],
                isShown: false,
            },
            {
                name: "jeux video",
                items: ["all", "jeux", "developpeurs", "consoles", "steam", "pc"],
                isShown: false,
            },
            {
                name: "cuisine",
                items: ["all", "française", "italienne", "japonaise", "chinoise", "indienne", "mexicaine", "espagnole", "americaine", "vegane", "vegetarienne"],
                isShown: false,
            },
        ],
    };

    return (
        <div className="relative flex flex-col w-full bg-white dark:bg-black ">
            <div className="text-black dark:text-white h-screen flex w-full bg-white dark:bg-black">
                <div className={`${sidePanel ? "translate-x-0 w-[275px]" : "translate-x-[-275px] w-[0px]"}  h-full flex flex-col bg-stone-100 dark:bg-stone-950 z-[60]  ease-in-out duration-300`}>
                    <div className="inline-flex dark:hidden flex-col pt-2 text-gray-600 dark:text-gray-200 my-6 px-8">
                        <Link href="/">
                            <Image src="/ARtlas2_short.png" alt="Artlas logo" width={340} height={148} />
                        </Link>
                    </div>
                    <div className="hidden dark:inline-flex flex-col pt-2 text-gray-600 dark:text-gray-200 my-6 px-8">
                        <Link href="/">
                            <Image src="/ARtlas3_short.png" alt="Artlas logo dark" width={340} height={148} />
                        </Link>
                    </div>
                    <nav className="flex-1 pb-4 items-stretch flex flex-col h-full overflow-y-auto">
                        <SideNavigation navigationInfo={navigationInfo} reducedPanel={false} />
                    </nav>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    <div
                        className={`sticky top-0 flex flex-shrink-0 bg-stone-100 dark:bg-stone-950 h-[55px] sm:h-[75px] text-black dark:text-white ${""} z-30 border-b-2 border-solid border-stone-200 dark:border-stone-800 `}
                    >
                        <div className="z-50 flex flex-shrink-0 w-full">
                            <button
                                type="button"
                                px-2
                                className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker px-[11px] sm:px-5 sm:ml-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                onClick={() => {
                                    setSidePanel(!sidePanel);
                                }}
                            >
                                <span className="sr-only">Open main menu</span>
                                <SlMenu size={24} />
                            </button>
                            <div className="flex-1 flex justify-end sm:justify-between z-40 gap-4 px-2">
                                <h1 className="text-lg md:text-3xl hidden sm:flex items-center truncate flex-1 font-artlas-logo">{sectionName}</h1>
                            </div>
                            <div className="flex items-center justify-end gap-4 pr-4">
                                <div className="hidden sm:flex flex-shrink-0 items-center gap-4">
                                    <SearchBar placeholder="Rechercher" />
                                    <Link
                                        href="/discover"
                                        className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                    >
                                        <FaCompass size={43} />
                                    </Link>
                                    <button
                                        type="button"
                                        className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                        onClick={() => handleUserMenu()}
                                    >
                                        {user ? <div className="w-[44px] h-[44px] rounded-full bg-stone-300 dark:bg-stone-700"></div> : <FaUserCircle size={44} className="w-8 h-8 sm:w-11 sm:h-11" />}
                                        <span className="sr-only">Open user menu</span>
                                    </button>
                                </div>
                                <div className="flex sm:hidden items-center justify-center w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800">
                                    <Image src="/Logo seul.png" alt="Artlas logo" width={40} height={40} className="rounded-full" />
                                </div>
                                {userMenu && (
                                    <div
                                        className={`absolute right-0 ${
                                            user ? "mt-[262px]" : "mt-[118px]"
                                        } w-48 bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-b-md border-2 border-solid border-t-0 border-stone-200 dark:border-stone-800 z-50 overflow-hidden`}
                                    >
                                        <div className="py-1">
                                            {user ? (
                                                <div>
                                                    <Link href="/profile" className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800">
                                                        Profil
                                                    </Link>
                                                    <Link href="/friends" className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800">
                                                        Mes amis
                                                    </Link>
                                                    <Link href="/mylists" className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800">
                                                        Mes listes
                                                    </Link>
                                                    <Link href="/settings" className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800">
                                                        Paramètres
                                                    </Link>
                                                    {/* <Link href="/logout" className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800">
                                                Déconnexion
                                            </Link>
                                            //TODO: Temporary, remove when login is implemented*/}
                                                    <button
                                                        onClick={() => setUser(null)}
                                                        className="block px-4 py-2 text-sm pr-24 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                    >
                                                        Déconnexion
                                                    </button>
                                                </div>
                                            ) : (
                                                // <Link href="/login" className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800">
                                                //     Connexion
                                                // </Link>
                                                // TODO: Temporary, remove when login is implemented
                                                <button
                                                    onClick={() => setUser({ name: "oui" })}
                                                    className="block px-4 py-2 text-sm pr-24 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                >
                                                    Connexion
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden sm:flex absolute pointer-events-none rounded-tl-3xl w-[40px] z-40 top-[73px] h-[calc(100vh-75px)] border-2 border-l-1 border-r-0 border-b-0 border-solid  border-stone-200 dark:border-stone-800 shadow-[-10px_-10px_0px_0px_rgba(0,0,0,0.3)] shadow-stone-100 dark:shadow-[#0c0a09]" />
                    </div>
                    <div className="flex flex-1 flex-col bg-stone-100 dark:bg-stone-950">
                        <div
                            className={`flex flex-col flex-grow  ${
                                sidePanel ? "blur-xl pointer-events-none brightness-75 sm:brightness-100 " : "pointer-events-auto brightness-100"
                            }  sm:blur-none sm:pointer-events-auto`}
                        >
                            <div className="flex  bg-white dark:bg-black min-h-screen h-full w-full p-8 z-50">
                                <div className="w-full">{children}</div>
                            </div>
                        </div>
                    </div>
                    <nav
                        className={`sm:hidden sticky bottom-0 flex flex-shrink-0 bg-stone-100 dark:bg-stone-950 h-[55px] text-black dark:text-white ${
                            sidePanel ? "blur-xl pointer-events-none brightness-75 sm:brightness-100 " : "pointer-events-auto brightness-100"
                        } z-30 border-t-2 border-solid border-stone-200 dark:border-stone-800 justify-between px-2 py-1`}
                    >
                        <Link
                            href="/"
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 mt-[1px] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                        >
                            {name !== "discover" && name !== "newpost" && name !== "search" && name !== "profile" && name !== "mobileUserMenu" && name !== "404" ? (
                                <HiLibrary size={44} className="w-[36px] h-[36px]" />
                            ) : (
                                <HiOutlineLibrary size={44} className="w-[36px] h-[36px]" />
                            )}
                            <span className="sr-only">Accueil</span>
                        </Link>
                        <Link
                            href="/discover"
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                        >
                            {name === "discover" ? <FaCompass size={44} className="w-7 h-7" /> : <FaRegCompass size={44} className="w-7 h-7" />}
                            <span className="sr-only">Decouvrir</span>
                        </Link>
                        <Link
                            href="/newpost"
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                        >
                            {name === "newpost" ? <PiPlusBold size={44} className="w-7 h-7" /> : <PiPlus size={44} className="w-7 h-7" />}
                            <span className="sr-only">Poster</span>
                        </Link>
                        <Link
                            href="/search"
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                        >
                            {name === "search" ? <IoSearch size={44} className="w-7 h-7 " /> : <IoSearchOutline size={44} className="w-7 h-7 " />}
                            <span className="sr-only">Rechercher</span>
                        </Link>
                        <Link
                            href={user ? "/mobileUserMenu" : "/login"}
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                        >
                            {name === "profile" || name === "mobileUserMenu" ? <FaUser size={44} className="w-7 h-7" /> : <FaRegUser size={44} className="w-7 h-7" />}
                            <span className="sr-only">Profil</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
