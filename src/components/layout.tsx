import SideNavigation from "./sideNavigation";
import SearchBar from "./searchbar";
import FloatingSearchBar from "./floatingSearchbar";
import { UserContext } from "./userContext";
import Image from "next/image";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import { FaCompass, FaRegCompass, FaUser, FaRegUser, FaMagnifyingGlass } from "react-icons/fa6";
import { HiLibrary, HiOutlineLibrary } from "react-icons/hi";
import { PiMagnifyingGlass } from "react-icons/pi";
import { PiPlusBold, PiPlus } from "react-icons/pi";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, setUserNeeded, connected, userNeeded } = useContext(UserContext);
    let name = useRouter().pathname.split("/")[1];
    const currentCategory = useRouter().query.category;
    const currentSubCategory = useRouter().query.subcategory;
    const currentPost = useRouter().query.id;
    if (name[0] === "[") {
        if (currentCategory && currentSubCategory) {
            if (currentSubCategory !== "all") name = currentCategory + " / " + currentSubCategory;
            else name = String(currentCategory);
        }
    }
    if (name === "post") {
        //TODO: get the post title from the database
        name = "post / " + currentPost; // temporary, to be replaced by the post title
    }
    if (name === "search") name = "recherche";
    if (name === "discover") name = "dé couvrir"; //NOTE: the space is intentional, it's due to the font that doesn't handle the accent properly
    if (name === "settings") name = "paramè tres";
    if (name === "mobileUserMenu") name = "profil";
    if (name === "profil" && !connected) name = "404";
    const [sectionName, setSectionName] = useState(name || "Artlas");

    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        const [windowSize, setWindowSize] = useState({
            width: 0,
            height: 0,
        });

        useEffect(() => {
            // only execute all the code below in client side
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }

    const size = useWindowSize();

    useEffect(() => {
        setSectionName(name.replaceAll("_", " ") || "Artlas");
    }, [name]);
    const [sidePanel, setSidePanel] = useState(true);
    const [reducedPanel, setReducedPanel] = useState(true);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileUserMenu, setMobileUserMenu] = useState(false);
    const [floatingSearchBar, setFloatingSearchBar] = useState(false);
    const [outlineLibrary, setOutlineLibrary] = useState(true);

    const handleUserMenu = () => {
        setUserMenu(!userMenu);
    };

    const handleMobileUserMenu = () => {
        setMobileUserMenu(!mobileUserMenu);
    };

    useEffect(() => {
        if (size.width > 640) {
            setSidePanel(true);
        } else {
            setSidePanel(false);
            setUserMenu(false);
        }
        if (size.width > 1024 || size.width < 640) {
            setReducedPanel(false);
        }
        if (size.width < 1024 && size.width > 640) {
            setReducedPanel(true);
        }
    }, [size, name]);

    useEffect(() => {
        name !== "dé couvrir" &&
        name !== "poster" &&
        name !== "search" &&
        name !== "profile" &&
        name !== "mobileUserMenu" &&
        name !== "404" &&
        name !== "post" &&
        name !== "profil" &&
        name !== "paramè tres"
            ? setOutlineLibrary(true)
            : setOutlineLibrary(false);
        setUserMenu(false);
    }, [name]);

    const handleSidePanel = () => {
        setSidePanel(!sidePanel);
    };

    const handleConnect = () => {
        setUserNeeded(true);
        console.log("needed ?" + userNeeded + " connected? " + connected);
    };

    const navigationInfo = {
        categories: [
            {
                id: 1,
                name: "cinema",
                items: ["all", "films", "series", "courts-metrages"],
                miniatureLink: "https://picsum.photos/100",
                isShown: false,
            },
            {
                id: 2,
                name: "musique",
                items: ["all", "musiques", "albums", "artistes"],
                miniatureLink: "https://picsum.photos/200",
                isShown: false,
            },
            {
                id: 3,
                name: "arts_plastiques",
                items: ["all", "peintures", "sculptures", "dessins", "gravures"],
                miniatureLink: "https://picsum.photos/201",
                isShown: false,
            },
            {
                id: 4,
                name: "arts_de_la_scene",
                items: ["all", "theatre", "danse", "opera", "cirque"],
                miniatureLink: "https://picsum.photos/202",
                isShown: false,
            },
            {
                id: 5,
                name: "litterature",
                items: ["all", "livres", "romans", "poesie", "bandes_dessinees", "mangas"],
                miniatureLink: "https://picsum.photos/203",
                isShown: false,
            },
            {
                id: 6,
                name: "photographie",
                items: ["all", "photos", "photographes"],
                miniatureLink: "https://picsum.photos/204",
                isShown: false,
            },
            {
                id: 7,
                name: "architecture",
                items: ["all", "batiments", "architectes"],
                miniatureLink: "https://picsum.photos/205",
                isShown: false,
            },
            {
                id: 8,
                name: "jeux_video",
                items: ["all", "jeux", "developpeurs", "consoles", "steam", "pc"],
                miniatureLink: "https://picsum.photos/206",
                isShown: false,
            },
            {
                id: 9,
                name: "cuisine",
                items: ["all", "française", "italienne", "japonaise", "chinoise", "indienne", "mexicaine", "espagnole", "americaine", "vegane", "vegetarienne"],
                miniatureLink: "https://picsum.photos/207",
                isShown: false,
            },
        ],
    };

    return (
        <div className="relative flex flex-col w-full bg-white dark:bg-black ">
            <div className="text-black dark:text-white h-screen flex w-full bg-white dark:bg-black">
                <div
                    className={`${sidePanel && reducedPanel ? "translate-x-0 w-[75px]" : ""} ${sidePanel && !reducedPanel ? "translate-x-0 w-[275px]" : ""} ${
                        !sidePanel && !reducedPanel ? "translate-x-[-275px] w-[0px]" : ""
                    } ${!sidePanel && reducedPanel ? "translate-x-[-75px] w-[0px]" : ""} h-full flex flex-col bg-stone-100 dark:bg-stone-950 z-[60]  ease-in-out duration-300`}
                >
                    <div className={`inline-flex dark:hidden flex-col pt-2 text-gray-600 dark:text-gray-200 ${!reducedPanel ? "my-6 px-8" : " mx-auto"}`}>
                        <Link href="/" id="openHomePageLightLink">
                            {!reducedPanel ? (
                                <Image src="/ARtlas2_short.png" alt="Artlas logo" width={size.width < 640 ? "153" : "340"} height={size.width < 640 ? "67" : "148"} />
                            ) : (
                                <Image src="/ARtlas1_no_bg.png" alt="Artlas logo" width={70} height={70} className="" />
                            )}
                        </Link>
                    </div>
                    <div className={`hidden dark:inline-flex flex-col pt-2 text-gray-600 dark:text-gray-200 ${!reducedPanel ? "my-6 px-8" : " mx-auto"}`}>
                        <Link href="/" id="openHomePageDarkLink">
                            {!reducedPanel ? (
                                <Image src="/ARtlas3_short_no_bg.png" alt="Artlas logo" width={size.width < 640 ? "153" : "340"} height={size.width < 640 ? "67" : "148"} />
                            ) : (
                                <Image src="/ARtlas4_no_bg.png" alt="Artlas logo" width={70} height={70} className="" />
                            )}
                        </Link>
                    </div>
                    <nav className="flex-1 pb-4 items-stretch flex flex-col h-full overflow-y-auto justify-between">
                        <SideNavigation navigationInfo={navigationInfo} reducedPanel={reducedPanel} />
                        <div className="hidden sm:flex w-full">
                            {reducedPanel ? (
                                <button
                                    onClick={() => setReducedPanel(false)}
                                    className="flex flex-row justify-between items-center mx-4 rounded-lg overflow-hidden border-2  mt-1 bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800  focus:rounded-lg focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none"
                                    type="button"
                                    id="reduceCategoryNavigationButton"
                                >
                                    <TbLayoutSidebarLeftExpandFilled size={24} className="w-8 h-8 mx-auto" />
                                    <span className="sr-only">Développer le panneau</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setReducedPanel(true)}
                                    className="flex flex-row justify-between items-center p-2 mx-4 rounded-lg border-2 mt-2 bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800
                                focus:rounded-lg focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none w-full"
                                    type="button"
                                    id="developpCategoryNavigationButton"
                                >
                                    <span className="md:text-xl pb-1">Réduire le panneau</span>
                                    <TbLayoutSidebarLeftCollapseFilled size={24} className="w-8 h-8 mx-auto" />
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    <div
                        className={`sticky top-0 flex flex-shrink-0 bg-stone-100 dark:bg-stone-950 h-[55px] sm:h-[75px] text-black dark:text-white ${""} z-30 border-b-2 border-solid border-stone-200 dark:border-stone-800 `}
                    >
                        <div className="z-50 flex flex-shrink-0 w-full justify-between">
                            <button
                                type="button"
                                className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker px-[11px] sm:px-5 sm:ml-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                onClick={() => {
                                    handleSidePanel();
                                }}
                                id="openSidePanelButton"
                            >
                                <span className="sr-only">Open main menu</span>
                                <SlMenu size={24} />
                            </button>
                            <div className="sm:flex-1 flex justify-end sm:justify-between z-40 gap-4 px-2">
                                <h1 className="text-base lg:text-lg xl:text-2xl 2xl:text-3xl my-auto sm:flex items-center truncate flex-1 font-artlas-logo selection:bg-stone-900 selection:text-stone-100 selection:dark:bg-white selection:dark:text-stone-900 ">
                                    {sectionName}
                                </h1>
                            </div>
                            <div className="flex items-center justify-end gap-4 pr-4">
                                <div className="hidden sm:flex flex-shrink-0 items-center gap-4">
                                    <button
                                        className="flex md:hidden text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                        type="button"
                                        id="openFloatingSearchBar"
                                        onClick={() => setFloatingSearchBar(!floatingSearchBar)}
                                    >
                                        <PiMagnifyingGlass size={43} />
                                        <span className="sr-only">Open floating search bar</span>
                                    </button>
                                    <div className="hidden md:flex">
                                        <SearchBar placeholder="Rechercher" />
                                    </div>
                                    <Link
                                        href="/poster"
                                        className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                        id="openNewpostMobileLink"
                                    >
                                        <PiPlusBold size={43} />
                                    </Link>
                                    <Link
                                        href="/discover"
                                        className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                        id="openDiscoverLink"
                                    >
                                        <FaCompass size={43} />
                                    </Link>
                                    <button
                                        type="button"
                                        className="text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500"
                                        onClick={() => handleUserMenu()}
                                        id="openUserMenuButton"
                                    >
                                        {user ? <div className="w-[44px] h-[44px] rounded-full bg-stone-300 dark:bg-stone-700"></div> : <FaUserCircle size={44} className="w-8 h-8 sm:w-11 sm:h-11" />}
                                        <span className="sr-only">Open user menu</span>
                                    </button>
                                </div>
                                <div className="flex sm:hidden items-center justify-center w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800">
                                    <Image src="/Logo seul.png" alt="Artlas logo" width={40} height={40} className="rounded-full" />
                                </div>
                                {floatingSearchBar && (
                                    <div className=" md:hidden absolute mr-2 sm:mr-20 px-1 mt-[108px] sm:mt-[128px] bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-b-md border-2 border-solid border-t-0 border-stone-200 dark:border-stone-800 z-50 overflow-hidden">
                                        <FloatingSearchBar placeholder="Rechercher" />
                                    </div>
                                )}
                                {userMenu && (
                                    <div
                                        className={`absolute right-0 ${
                                            user ? "mt-[262px]" : "mt-[118px]"
                                        } w-48 bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-b-md border-2 border-solid border-t-0 border-stone-200 dark:border-stone-800 z-50 overflow-hidden`}
                                    >
                                        <div className="py-1">
                                            {user ? (
                                                <div>
                                                    <Link
                                                        href="/profile"
                                                        className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                        id="openProfileLink"
                                                    >
                                                        Profil
                                                    </Link>
                                                    <Link
                                                        href="/friends"
                                                        className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                        id="openFriendsLink"
                                                    >
                                                        Mes amis
                                                    </Link>
                                                    <Link
                                                        href="/mylists"
                                                        className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                        id="openMyListsLink"
                                                    >
                                                        Mes listes
                                                    </Link>
                                                    <Link
                                                        href="/settings"
                                                        className="block px-4 py-2 text-sm hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                        id="openSettingsLink"
                                                    >
                                                        Paramètres
                                                    </Link>
                                                    <button
                                                        onClick={() => logout()}
                                                        className="block px-4 py-2 text-sm pr-24 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                        id="logoutButton"
                                                        type="button"
                                                    >
                                                        Déconnexion
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleConnect()}
                                                    className="block px-4 py-2 text-sm pr-24 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800"
                                                    id="loginButton"
                                                    type="button"
                                                >
                                                    Connexion
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden sm:flex absolute pointer-events-none rounded-tl-3xl w-[40px] z-40 top-[73.2px] h-[calc(100vh-75px)] border-2 border-l-1 border-r-0 border-b-0 border-solid  border-stone-200 dark:border-stone-800 shadow-[-10px_-10px_0px_0px_rgba(0,0,0,0.3)] shadow-stone-100 dark:shadow-[#0c0a09]" />
                    </div>
                    <div className="flex flex-1 flex-col bg-stone-100 dark:bg-stone-950" id="HomeView">
                        <div
                            className={`flex flex-col flex-grow  ${
                                sidePanel ? "blur-xl pointer-events-none brightness-75 sm:brightness-100 " : "pointer-events-auto brightness-100"
                            }  sm:blur-none sm:pointer-events-auto`}
                        >
                            <div className="flex  bg-white dark:bg-black min-h-screen h-full w-full p-8 z-50">
                                <div className="w-full selection:bg-stone-900 selection:text-stone-100 selection:dark:bg-white selection:dark:text-stone-900 ">{children}</div>
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
                            id="openHomePageMobileLink"
                        >
                            {outlineLibrary ? <HiLibrary size={44} className="w-[36px] h-[36px]" /> : <HiOutlineLibrary size={44} className="w-[36px] h-[36px]" />}
                            <span className="sr-only">Accueil</span>
                        </Link>
                        <Link
                            href="/discover"
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                            id="openDicoverMobileLink"
                        >
                            {name === "dé couvrir" ? <FaCompass size={44} className="w-7 h-7" /> : <FaRegCompass size={44} className="w-7 h-7" />}
                            <span className="sr-only">Decouvrir</span>
                        </Link>
                        <Link
                            href="/poster"
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                            id="openNewpostMobileLink"
                        >
                            {name === "poster" ? <PiPlusBold size={44} className="w-7 h-7" /> : <PiPlus size={44} className="w-7 h-7" />}
                            <span className="sr-only">Poster</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setFloatingSearchBar(!floatingSearchBar)}
                            className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                            id="openSearchMobileButton"
                        >
                            {name === "search" || floatingSearchBar ? <IoSearch size={44} className="w-7 h-7 " /> : <IoSearchOutline size={44} className="w-7 h-7 " />}
                            <span className="sr-only">Rechercher</span>
                        </button>
                        {connected ? (
                            <Link
                                href={"/mobileUserMenu"}
                                className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                                id="openUserMenuMobileLink"
                            >
                                {name === "profile" || name === "profil" || name === "paramè tres" ? <FaUser size={44} className="w-7 h-7" /> : <FaRegUser size={44} className="w-7 h-7" />}
                                <span className="sr-only">Profil</span>
                            </Link>
                        ) : (
                            <button
                                onClick={() => handleConnect()}
                                className="hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 hover:rounded-full z-30 focus:rounded-full focus:text-grey-darker p-1 my-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 px-[7px]"
                                id="loginMobileButton"
                                type="button"
                            >
                                {name === "profile" || name === "profil" ? <FaUser size={44} className="w-7 h-7" /> : <FaRegUser size={44} className="w-7 h-7" />}
                                <span className="sr-only">Profil</span>
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}
