import React, { useState, useContext, useEffect } from "react";
import { Oeuvre } from "@/types/oeuvre";
import Post from "../components/post";
import DiscoverPost from "../components/discoverPost";
import E404 from "./404";
import Masonry from "react-masonry-css";
import { UserContext } from "../components/userContext";
import { Friend } from "../components/profileDes";
import { Description } from "../components/profileDes";
import { Liste } from "../components/profileDes";
import { retrieveFollowedArtists } from "../utils/communityHandler";
import { getArtOfArtistBasedOnId, retrieveArtLikedByUser } from "../utils/artHandler";

//TODO: replace every temporary item by the real data from the database:
/*
 * - user
 * - posts
 * - liked
 * - listes
 * - friends
 */

//TODO
// REMOVE bday and city from the user card
export default function Profile() {
    const { user, connected, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const [posts, setPosts] = useState<Oeuvre[]>([]);
    const [likes, setLikes] = useState<Oeuvre[]>([]);
    const [galerie, setGalerie] = useState<Oeuvre[]>([]);
    const birthday = new Date(user?.birthdate || "17/11/2023");
    const [section, setSection] = useState("post");
    const [followedArtists, setFollowedArtists] = useState(null);
    const [arts, setArts] = useState(null);
    const handleItemClickPost = () => {
        setSection("post");
    };
    const handleItemClickLiked = () => {
        setSection("liked");
    };
    const handleItemClickListe = () => {
        setSection("liste");
    };
    const handleItemClickGalerie = () => {
        setSection("galerie");
    };
    const [autoPlaying, setAutoPlaying] = useState(autoPlayDiaporamas || false);

    useEffect(() => {
        if (user?.username) {
            const fetchData = async () => {
                let data = await getArtOfArtistBasedOnId(user?.username || "");
                sortPostsByMostRecentPostDate(data);
                setPosts(data);
                console.log("Posts:", data);
                data = await retrieveArtLikedByUser(user?.username || "");
                sortPostsByMostRecentPostDate(data);
                setLikes(data);
                console.log("Likes:", data);
                data = [] as Oeuvre[];
                posts.forEach((post) => {
                    if (post.isInGallery) data.push(post);
                });
                sortPostsByMostRecentPostDate(data);
                setGalerie(data);
                console.log("Gallerie:", data);
            };
            fetchData();
        }
    }, []); // Retirez posts du tableau de dépendances

    function sortPostsByMostRecentPostDate(posts: Oeuvre[]) {
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

    //TODO
    /*useEffect(() => {
        const fetchData = async () => {
            if (user?.username) {
                //! This is a function to retrieve the followed artists (id and photos)
                const artists = await retrieveFollowedArtists(user.username);
                setFollowedArtists(artists);
                //! This function to retrieve the arts of the artist based on his id.
                const artistArts = await getArtOfArtistBasedOnId(user.username);
                setArts(artistArts);
            }
        };

        fetchData();
        console.log(followedArtists);
        console.log(arts);
    }, [user?.username]);
*/
    useEffect(() => {
        setAutoPlayDiaporamas(autoPlaying);
    }, [autoPlaying, setAutoPlayDiaporamas]);

    useEffect(() => {
        setAutoPlaying(autoPlayDiaporamas);
    }, [autoPlayDiaporamas]);

    const breakpointColumnsObj = {
        default: 1,
        2600: 4,
        2100: 3,
        1750: 2,
        1100: 1,
        500: 1,
    };

    const tempPost1: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        // illustration: ["https://picsum.photos/450", "https://picsum.photos/1455", "https://picsum.photos/464/700", "https://picsum.photos/1450/700"],
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
        isMediaTypeImages: false,
        author: "Jean-Michel",
        likeCount: 0,
    };

    return connected ? (
        <div className="h-full w-full">
            <main className="flex w-full">
                <div className="h-full w-full flex flex-col lg:flex-row-reverse lg:justify-between ">
                    <div className="flex flex-col lg:flex-1 w-full lg:items-end lg:pl-1">
                        <Description photoProfile={user?.image || "/pp-image-ex.jpg"} userName={user?.username || "Jean-Michel"} preference={user?.favoritCat || "Art"} account_birthday="17/11/2023" />
                        <h2 className="text-xl font-bold mb-2 cursor-text mt-3">Mes abonnements</h2>
                        <div className="flex flex-row lg:flex-col w-full lg:w-48 overflow-x-scroll lg:overflow-hidden">
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Anna" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Encore_Anna" />
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Jean-Michel" />
                        </div>
                    </div>
                    <div className="flex flex-col px-1 w-full">
                        <div className="inline-flex flex-row text-xl justify-between space-x-2 mt-2 lg:mt-0 w-full max-w-sm mx-auto">
                            <button
                                className={`p-1 rounded-lg ${
                                    section === "post"
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
                                    section === "liked"
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
                                    section === "liste"
                                        ? "bg-black dark:bg-white text-white dark:text-black "
                                        : "text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900"
                                }`}
                                onClick={handleItemClickListe}
                                type="button"
                            >
                                <span className="m-2">Listes</span>
                            </button>
                            <button
                                className={`p-1 rounded-lg ${
                                    section === "galerie"
                                        ? "bg-black dark:bg-white text-white dark:text-black "
                                        : "text-black dark:text-white hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900"
                                }`}
                                onClick={handleItemClickGalerie}
                                type="button"
                            >
                                <span className="m-2">Galerie</span>
                            </button>
                        </div>
                        <hr className="rounded-full border-2 mt-1 border-black dark:border-white w-full max-w-sm mx-auto" />
                        {section === "post" && (
                            <div className="">
                                <div className="max-w-[800px] mx-auto">
                                    {posts.map((post) => (
                                        <Post key={post._id} {...post} />
                                    ))}

                                    <Post {...tempPost1} likeCount={42} />
                                    <Post {...tempPost2} />
                                </div>
                            </div>
                        )}
                        {section === "liked" && (
                            <div className="max-w-[800px] mx-auto">
                                {likes.map((post) => (
                                    <Post key={post._id} {...post} />
                                ))}
                                <Post {...tempPost1} likeCount={42} />
                                <Post {...tempPost2} />
                            </div>
                        )}
                        {section === "liste" && (
                            <div className="max-w-[800px] mx-auto w-full">
                                <Liste listeName="Mes sculptures préférées" picture="/pp-image-ex.jpg" author="azerty" listId="la1" />
                                <Liste listeName="Photos stylés" picture="/pp-image-ex.jpg" author="azerty" listId="la2" />
                                <Liste listeName="Liste des oeuvres à voir" picture="/pp-image-ex.jpg" author="azerty" listId="la3" />
                            </div>
                        )}
                        {section === "galerie" && (
                            <div className="">
                                <Masonry className="flex flex-wrap mt-4" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                                    {galerie.map((post) => (
                                        <DiscoverPost key={post._id} {...post} autoPlaying={autoPlaying} scaleEffect={false} />
                                    ))}
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                    <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={false} />
                                </Masonry>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    ) : (
        <E404 />
    );
}
