import Image from "next/image";
import Post from "../components/post";

export default function Monfeed() {
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

    const tempPost2 = {
        id: 1,
        title: "Star Wars",
        description: "Star Wars 3 trailer",
        category: "Cinema",
        subCategory: "Films",
        video: "https://youtu.be/t1qtvKYwTV0",
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };

    const tempPost3 = {
        id: 1,
        title: "Twitch.tv",
        description: "Une video de twitch",
        category: "Cinema",
        subCategory: "Films",
        video: "https://www.twitch.tv/videos/1778232094?collection=sHU0nUioUBcc0Q",
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };

    const tempPost4 = {
        id: 1,
        title: "Dailymotion",
        description: "Une video de daily motion à la verticale",
        category: "Cinema",
        subCategory: "Films",
        video: "https://www.dailymotion.com/video/x8pvuxl",
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
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
