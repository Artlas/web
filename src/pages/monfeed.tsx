import Image from "next/image";
import { getAllArt } from "../api/artAPI";
import { Oeuvre } from "@/types/oeuvre";
import Post from "../components/post";
import apiConfig from "../api/apiConfig.json";
import { useEffect, useState } from "react";

export default function Monfeed() {
    const [posts, setPosts] = useState<Oeuvre[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllArt();
            sortPostsByMostRecentPostDate(data);
            setPosts(data);
        };
        fetchData();
    }, []);

    function sortPostsByMostRecentPostDate(posts: Oeuvre[]) {
        if (posts.length > 0) {
            return posts.sort((a, b) => {
                if (typeof a.postDate === "string") {
                    a.postDate = new Date(a.postDate);
                }
                if (typeof b.postDate === "string") {
                    b.postDate = new Date(b.postDate);
                }
                return b.postDate.getTime() - a.postDate.getTime();
            });
        }
    }

    return (
        <main className="flex w-full">
            <div className="h-full w-full">
                <h1 className="text-4xl font-bold dark:text-white">Bienvenue sur votre feed</h1>
                <div className="max-w-[800px] justify-center mx-auto">{posts && posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}</div>
            </div>
        </main>
    );
}
