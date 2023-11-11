import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { SlMenu } from "react-icons/sl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Artlas",
    description: "Artlas is a social network to discover and share art.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const sectionName = "Artlas"; // A rendre dynamique avec le nom de la page
    return (
        <html lang="en">
            <body className="relative flex flex-col w-full bg-white dark:bg-black">
                <div className="text-black dark:text-white h-full flex w-full bg-white dark:bg-black">
                    <div className="w-[275px] h-full flex flex-col bg-white dark:bg-black">
                        <div className="inline-flex dark:hidden flex-col pt-2 text-gray-600 dark:text-gray-200 my-6 px-8">
                            <Image src="/ARtlas2_short.png" alt="Artlas logo" width={340} height={148} />
                        </div>
                        <div className="hidden dark:inline-flex flex-col pt-2 text-gray-600 dark:text-gray-200 my-6 px-8">
                            <Image src="/ARtlas3_short.png" alt="Artlas logo" width={340} height={148} />
                        </div>
                        <nav className="flex-1 pb-4 items-stretch flex flex-col h-full overflow-y-auto justify-end"></nav>
                    </div>
                    <div className="flex flex-1 flex-col overflow-y-auto">
                        <div className="sticky top-0 flex flex-shrink-0 bg-white dark:bg-black h-[75px] text-black dark:text-white">
                            <button
                                type="button"
                                className="text-grey-mid hover:text-grey-darkest z-30 hover:dark:text-grey-lighter focus:text-grey-darker py-2 px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                <SlMenu size={24} />
                            </button>
                            <div className="flex-1 flex justify-end sm:justify-between z-40 gap-4 px-2">
                                <h1 className="text-lg md:text-3xl hidden sm:flex items-center truncate flex-1 font-artlas-logo">{sectionName}</h1>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col bg-white dark:bg-black">
                            <div className="flex flex-col flex-grow blur-xl cursor-pointer sm:cursor-default sm:blur-none brightness-75 sm:brightness-100 pointer-events-none sm:pointer-events-auto">
                                <div className="flex flex-col flex-grow rounded-tl-3xl">
                                    <div>{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
