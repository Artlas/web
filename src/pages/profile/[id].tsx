import React, { useState, useContext, useEffect } from "react";
import { Oeuvre } from "@/types/oeuvre";
import Post from "../../components/post";
import E404 from "../404";
import { UserContext } from "../../components/userContext";
import { Friend } from "../../components/profileDes";
import { Description } from "../../components/profileDes";
import { Liste } from "../../components/profileDes";

//TODO: replace every temporary item by the real data from the database:
/*
 * - user
 * - posts
 * - liked
 * - listes
 * - friends
 */
export default function Profile() {
    //! This is a temporary user, it will be replaced by the user from the database, queried by the id in the url
    //TODO: Replace this temporary user by the user from the database
    const user = {
        username: "Jean-Michel",
        birthdate: "17/11/2023",
        address: "Paris",
        image: "https://picsum.photos/450",
    };
    const birthday = new Date(user?.birthdate || "17/11/2023");

    const [clickedPost, setclickedPost] = useState(true);
    const [clickedLiked, setclickedLiked] = useState(false);
    const [clickedListe, setclickedListe] = useState(false);
    const handleItemClickPost = () => {
        setclickedPost(true);
        setclickedLiked(false);
        setclickedListe(false);
    };
    const handleItemClickLiked = () => {
        setclickedPost(false);
        setclickedLiked(true);
        setclickedListe(false);
    };
    const handleItemClickListe = () => {
        setclickedPost(false);
        setclickedLiked(false);
        setclickedListe(true);
    };

    const tempPost2: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/650/1100", "https://picsum.photos/1455/500"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        likeCount: 0,
        author: "Jean-Michel",
    };
    const tempPost3: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/1600/900", "https://picsum.photos/1455/800", "https://picsum.photos/469/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        likeCount: 0,
        author: "Jean-Michel",
    };
    const tempPost4: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description:
            "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan. On essaye avec une deco un peu plus longue pour voir ce que ça donne avec un texte plus long, et beaucoup plus de mots, parce que là c'est vraiment pas assez long. Un peu de Wikipédia : La photographie de paysage est un genre de photographie dont l'objet est la prise de vue de paysage. Elle est, avec la photographie de famille et le portrait, un des genres de photographie artistique les plus pratiqués par les photographes amateurs. Il faut distinguer la photographie de paysages naturels de celle de paysages urbains.",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/1600/800"],
        postDate: new Date(),
        releaseDate: new Date(),
        likeCount: 0,
        author: "Jean-Michel",
        isMediaTypeImages: true,
    };

    return (
        <div className="h-full w-full">
            <main className="flex w-full">
                <div className="h-full w-full flex flex-col lg:flex-row-reverse lg:justify-between ">
                    <div className="flex flex-col lg:flex-1 w-full lg:items-end lg:pl-1">
                        <Description
                            photoProfile={user?.image || "/pp-image-ex.jpg"}
                            userName={user?.username || "Jean-Michel"}
                            description="Bonjour, je suis une artiste"
                            preference="Musique"
                            loisir="Peinture"
                            birthday={birthday.toLocaleDateString()}
                            account_birthday="17/11/2023"
                            address={user?.address || "Paris"}
                        />
                        <h2 className="text-xl font-bold mb-2 cursor-text mt-3">Les abonnements de {user.username}</h2>
                        <div className="flex flex-row lg:flex-col w-full lg:w-48 overflow-x-scroll lg:overflow-hidden">
                            <Friend photoProfile="/pp-image-ex.jpg" userName="King Julian" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Fred" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Anna" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Alice" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Bob" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Julia" />
                        </div>
                    </div>
                    <div className="flex flex-col px-1">
                        <div className="inline-flex flex-row text-xl justify-between space-x-2 mt-2 lg:mt-0 w-full max-w-sm mx-auto">
                            <button
                                className={`p-1 rounded-lg ${
                                    clickedPost
                                        ? "bg-black dark:bg-white text-white dark:text-black "
                                        : "text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900"
                                }`}
                                onClick={handleItemClickPost}
                                type="button"
                            >
                                <span className="m-3">Posts</span>
                            </button>
                            <button
                                className={`p-1 rounded-lg ${
                                    clickedLiked
                                        ? "bg-black dark:bg-white text-white dark:text-black "
                                        : "text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900"
                                }`}
                                onClick={handleItemClickLiked}
                                type="button"
                            >
                                <span className="m-2">J&apos;aime</span>
                            </button>
                            <button
                                className={`p-1 rounded-lg ${
                                    clickedListe
                                        ? "bg-black dark:bg-white text-white dark:text-black "
                                        : "text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900"
                                }`}
                                onClick={handleItemClickListe}
                                type="button"
                            >
                                <span className="m-2">Listes</span>
                            </button>
                        </div>
                        <hr className="rounded-full border-2 mt-1 border-black dark:border-white w-full max-w-sm mx-auto" />
                        {clickedPost && (
                            <div className="">
                                <div className="max-w-[800px] mx-auto">
                                    <Post {...tempPost2} likeCount={42} />
                                    <Post {...tempPost3} />
                                    <Post {...tempPost4} />
                                </div>
                            </div>
                        )}
                        {clickedLiked && (
                            <div className="max-w-[800px] mx-auto">
                                <Post {...tempPost2} />
                            </div>
                        )}
                        {clickedListe && (
                            <div className="max-w-[800px] mx-auto">
                                <Liste listeName="Mes sculptures préférées" picture="/pp-image-ex.jpg" />
                                <Liste listeName="Photos stylés" picture="/pp-image-ex.jpg" />
                                <Liste listeName="Liste des oeuvres à voir" picture="/pp-image-ex.jpg" />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
