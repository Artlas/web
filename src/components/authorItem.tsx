import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface AuthorItemProps {
    imageSrc?: string;
    authorName: string;
    releaseDate?: string;
    linkToProfile?: string;
    small?: boolean;
}

const AuthorItem: React.FC<AuthorItemProps> = ({ imageSrc, authorName, releaseDate, linkToProfile, small }) => {
    return (
        <div className="flex items-center ">
            <Link href={linkToProfile || "#"} className="flex p-2 rounded-full hover:bg-stone-200 hover:dark:bg-stone-800 active:bg-stone-300 active:dark:bg-stone-900 items-center">
                {imageSrc ? (
                    <Image src={imageSrc} alt="Author" width={small ? 32 : 56} height={small ? 32 : 56} className={`${small ? "w-8 h-8" : "w-14 h-14"} rounded-full mr-3`} />
                ) : (
                    <FaUserCircle className={`${small ? "w-8 h-8" : "w-14 h-14"} rounded-full mr-3`} />
                )}
                <div className="flex flex-col pr-2">
                    <span className={`font-bold ${small ? "text-base" : "text-2xl"}`}>{authorName}</span>
                    <span className={`text-gray-800 dark:text-stone-200 font-light ${small ? "text-sm" : "text-base  ml-[2px]"}`}>Le {releaseDate}</span>
                </div>
            </Link>
        </div>
    );
};

export default AuthorItem;
