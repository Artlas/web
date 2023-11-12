"use client";
import { useState } from "react";
import { FaHeart, FaShareAlt, FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

interface PostProps {
    title: string;
    description: string;
    mediaUrl: string;
}

export default function Post({ title, description, mediaUrl }: PostProps) {
    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleListClick = () => {
        setListed(!listed);
    };

    return (
        <div className="bg-white dark:bg-black rounded-xl shadow-lg dark:shadow-none border dark:border-stone-700 p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <div className="relative w-full h-60">
                <Image src={mediaUrl} alt={title} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="p-4">
                <p className="text-gray-600 dark:text-slate-300">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <button className={`flex items-center space-x-2 ${liked ? "text-red-500" : "text-gray-500 dark:text-slate-300"}`} onClick={handleLikeClick}>
                        <FaHeart className="h-5 w-5" />
                        <span className="sr-only">{"J'aime"}</span>
                    </button>
                    <button className={`flex items-center space-x-2 ${listed ? "text-black dark:text-white" : "text-gray-500 dark:text-slate-300"}`} onClick={handleListClick}>
                        {listed ? (
                            <div className="flex flex-row justify-between gap-2">
                                <FaCheckCircle className="h-5 w-5" /> <span>Dans ma liste</span>
                            </div>
                        ) : (
                            <div className="flex flex-row justify-between gap-2">
                                <FaPlusCircle className="h-5 w-5" />
                                <span>Ajouter à ma liste</span>
                            </div>
                        )}
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 dark:text-slate-300">
                        <FaShareAlt className="h-5 w-5" />
                        <span>Partager</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
