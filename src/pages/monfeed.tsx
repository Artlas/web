import Image from "next/image";
import { Oeuvre } from "@/types/oeuvre";
import Post from "../components/post";
import apiConfig from "../api/apiConfig.json";
import { useEffect } from "react";

export default function Monfeed() {
    const tempPost1: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/450", "https://picsum.photos/1455", "https://picsum.photos/464/700", "https://picsum.photos/1450/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        author: "Jean-Michel",
        likeCount: 0,
    };

    const tempPost2: Oeuvre = {
        _id: 2,
        title: "Star Wars",
        description: "Star Wars 3 trailer",
        category: "Cinema",
        subCategory: "Films",
        video: "https://youtu.be/t1qtvKYwTV0",
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        author: "Jean-Michel",
        likeCount: 0,
    };

    const tempPost3: Oeuvre = {
        _id: 3,
        title: "Twitch.tv",
        description: "Une video de twitch",
        category: "Cinema",
        subCategory: "Films",
        video: "https://www.twitch.tv/videos/1778232094?collection=sHU0nUioUBcc0Q",
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        author: "Jean-Michel",
        likeCount: 0,
    };

    const tempPost4: Oeuvre = {
        _id: 4,
        title: "Dailymotion",
        description: "Une video de daily motion à la verticale",
        category: "Cinema",
        subCategory: "Films",
        video: "https://www.dailymotion.com/video/x8pvuxl",
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        author: "Jean-Michel",
        likeCount: 0,
    };

    return (
        <main className="flex w-full">
            <div className="h-full w-full">
                <h1 className="text-4xl font-bold dark:text-white">Bienvenue sur votre feed</h1>
                <div className="max-w-[800px] justify-center mx-auto">
                    <Post {...tempPost1} />
                    <Post {...tempPost2} />
                    <Post {...tempPost3} />
                    <Post {...tempPost4} />
                </div>
            </div>
        </main>
    );
}
