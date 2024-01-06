import React, { ReactNode } from "react";
import Link from "next/link";
import E404 from "./404";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/userContext";
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdAttachEmail, MdFamilyRestroom, MdBrightness4, MdBrightnessHigh, MdBrightnessAuto, MdPolicy } from "react-icons/md";
import { FaUser, FaUserTag, FaCookie, FaCircleInfo, FaCirclePlay } from "react-icons/fa6";
import { FaUserEdit, FaCircle, FaCheckCircle } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import Image from "next/image";
var pjson = require("../../package.json");

type ListElementProps = {
    icon: ReactNode;
    label: string;
    content: ReactNode;
    href?: string;
    hideBar?: boolean;
};

const ListElement: React.FC<ListElementProps> = ({ icon, label, content, href, hideBar }) => {
    return href ? (
        <>
            <Link
                href={href}
                className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2 text-base md:text-lg rounded-md cursor-pointer"
            >
                <div className="flex items-center">
                    {icon}
                    <span className="select-none">{label}</span>
                </div>
                {content}
            </Link>
            {!hideBar && <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />}
        </>
    ) : (
        <>
            <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2 text-base md:text-lg rounded-md cursor-pointer">
                <div className="flex items-center overflow-hidden">
                    {icon}
                    <span className="select-none text-ellipsis">{label}</span>
                </div>
                {content}
            </div>
            {!hideBar && <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />}
        </>
    );
};

type Props = {};

export default function Settings({}: Props) {
    const { user, userNeeded, connected, logout } = useContext(UserContext);
    const [theme, setTheme] = useState("device");
    const [acceptCookies, setAcceptCookies] = useState(user?.acceptCookies || false);
    const [autoPlayDiaporamas, setAutoPlayDiaporamas] = useState(user?.autoPlayDiaporamas || false);

    const handleThemeChange = (selectedTheme: string) => {
        setTheme(selectedTheme);
    };

    //TODO: Add other settings logic here
    /*
     * - Theme
     * - Cookies
     * - AutoPlay
     * - Password
     */

    return connected ? (
        <div className="container xl:max-w-4xl mx-auto bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-md border-2 border-solid  border-stone-200 dark:border-stone-800 py-4">
            {user?.avatar && <Image src={user?.avatar} alt="Artlas Logo" width={100} height={100} className="mx-auto rounded-full border-2 border-black dark:border-white mb-4" />}
            <div className="px-2">
                <h2 className="text-xl font-bold mx-2">Mon compte</h2>
                <ListElement icon={<FaUser className="mr-2" size={25} />} label={"Nom d'utilisateur"} content={<div>{user?.username}</div>} />
                <ListElement icon={<MdAttachEmail className="mr-2" size={25} />} label={"Email"} content={<div>{user?.email}</div>} />
                <ListElement icon={<MdFamilyRestroom className="mr-2" size={25} />} label={"Nom"} content={<div>{user?.familyName}</div>} />
                <ListElement icon={<FaUserTag className="mr-2" size={25} />} label={"Prénom"} content={<div>{user?.name}</div>} />
                <ListElement icon={<FaUserEdit className="mr-2" size={25} />} label={"Modifier mes informations"} content={<IoMdArrowRoundForward size={30} />} href={"/settings/editprofile"} />
            </div>

            <div className="px-2">
                <h2 className="text-xl font-bold mt-4 mx-2">Apparence</h2>
                <label htmlFor="lightThemeRadioButton" className="">
                    <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2  text-base md:text-lg rounded-md">
                        <div className="flex items-center">
                            <MdBrightnessHigh className="mr-2" size={25} />
                            <span>Thème clair</span>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <input type="radio" id="lightThemeRadioButton" name="theme" checked={theme === "light"} onChange={() => handleThemeChange("light")} className="hidden" />
                                {theme === "light" ? <FaCheckCircle className="text-black dark:text-white" size={25} /> : <FaCircle className="text-gray-300 dark:text-stone-600" size={25} />}
                            </div>
                        </div>
                    </div>
                </label>
                <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />
                <label htmlFor="darkThemeRadioButton" className="">
                    <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2  text-base md:text-lg rounded-md">
                        <div className="flex items-center">
                            <MdBrightness4 className="mr-2" size={25} />
                            <span>Thème sombre</span>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <input type="radio" id="darkThemeRadioButton" name="theme" checked={theme === "dark"} onChange={() => handleThemeChange("dark")} className="hidden" />
                                {theme === "dark" ? <FaCheckCircle className="text-black dark:text-white" size={25} /> : <FaCircle className="text-gray-300 dark:text-stone-600" size={25} />}
                            </div>
                        </div>
                    </div>
                </label>
                <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />
                <label htmlFor="deviceThemeRadioButton" className="">
                    <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2  text-base md:text-lg rounded-md">
                        <div className="flex items-center">
                            <MdBrightnessAuto className="mr-2" size={25} />
                            <span>{"Thème de l'appareil"}</span>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <input type="radio" id="deviceThemeRadioButton" name="theme" checked={theme === "device"} onChange={() => handleThemeChange("device")} className="hidden" />
                                {theme === "device" ? <FaCheckCircle className="text-black dark:text-white" size={25} /> : <FaCircle className="text-gray-300 dark:text-stone-600" size={25} />}
                            </div>
                        </div>
                    </div>
                </label>
                <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />
                <label htmlFor="AutoPlayDiapos" className="">
                    <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2  text-base md:text-lg rounded-md">
                        <div className="flex items-center">
                            <FaCirclePlay className="mr-2" size={25} />
                            <span className="select-none">Lancer automatiquement les diaporamas</span>
                        </div>
                        <div className="relative mb-5 cursor-pointer">
                            <input
                                type="checkbox"
                                name="AutoPlay"
                                id="AutoPlayDiapos"
                                className="peer sr-only"
                                checked={autoPlayDiaporamas}
                                onChange={() => setAutoPlayDiaporamas(!autoPlayDiaporamas)}
                            />
                            <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        </div>
                    </div>
                </label>
                <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />
            </div>

            <div className="px-2">
                <h2 className="text-xl font-bold mt-4 mx-2">Confidentialité et sécurité</h2>
                <label htmlFor="cookiesToggleButton" className="">
                    <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2  text-base md:text-lg rounded-md">
                        <div className="flex items-center">
                            <FaCookie className="mr-2" size={25} />
                            <span className="select-none">Autoriser les cookies</span>
                        </div>
                        <div className="relative mb-5 cursor-pointer">
                            <input type="checkbox" name="cookies" id="cookiesToggleButton" className="peer sr-only" checked={acceptCookies} onChange={() => setAcceptCookies(!acceptCookies)} />
                            <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        </div>
                    </div>
                </label>
                <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />
                <ListElement icon={<PiPasswordFill className="mr-2" size={25} />} label={"Changer de mot de passe"} content={<IoMdArrowRoundForward size={30} />} href="/settings/passwordreset" />
                <ListElement icon={<MdPolicy className="mr-2" size={25} />} label={"Politique de confidentialité"} content={<IoMdArrowRoundForward size={30} />} href="/settings/policy" />
            </div>

            <div className="px-2">
                <h2 className="text-xl font-bold mt-4 mx-2">À propos</h2>
                <ListElement icon={<FaCircleInfo className="mr-2" size={25} />} label={"Version"} content={<div>{pjson.version}</div>} hideBar={true} />
            </div>
        </div>
    ) : (
        <E404 />
    );
}
