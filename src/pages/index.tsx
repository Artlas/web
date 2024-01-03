import Image from "next/image";
import Post from "../components/post";
import { useState, useEffect } from "react";

export default function Home() {
    const tempPost1 = {
        id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/450", "https://picsum.photos/1455", "https://picsum.photos/464/700", "https://picsum.photos/1450/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };
    return (
        <main className="flex w-full">
            <div className="h-full w-full">
                <h1 className="text-4xl font-bold dark:text-white">Bienvenue sur Artlas</h1>
                <div className="max-w-[800px] justify-center mx-auto">
                    <Post {...tempPost1} />
                    <Post {...tempPost1} />
                    <Post {...tempPost1} />
                </div>
            </div>
        </main>
    );
}
