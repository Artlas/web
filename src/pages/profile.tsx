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
    const [section, setSection] = useState("post");
    const [followings, setFollowings] = useState<any[]>([]);
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
        if (user?.username && posts.length === 0 && likes.length === 0) {
            const fetchData = async () => {
                let data = await getArtOfArtistBasedOnId(user?.username || "");
                if (data !== undefined) {
                    sortPostsByMostRecentPostDate(data);
                    setPosts(data);
                    // console.log("Posts:", data);
                } else {
                    // console.log("No posts found");
                }
                data = await retrieveArtLikedByUser(user?.username || "");
                if (data !== undefined) {
                    sortPostsByMostRecentPostDate(data);
                    setLikes(data);
                    // console.log("Likes:", data);
                } else {
                    console.log("No liked posts found");
                }
            };
            fetchData();
        }
    }, [user?.username]);

    useEffect(() => {
        if (user?.username && galerie.length === 0) {
            const fetchData = async () => {
                let data = [] as Oeuvre[];
                posts.forEach((post) => {
                    post.isInGallery && data.push(post);
                });
                sortPostsByMostRecentPostDate(data);
                setGalerie(data);
                // console.log("Galerie:", data);
            };
            fetchData();
        }
    }, [posts]);

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

    useEffect(() => {
        const fetchData = async () => {
            if (user?.username) {
                const artists = await retrieveFollowedArtists(user.username);
                if (artists !== undefined) {
                    console.log("Artists found:", artists);
                    setFollowings(artists);
                } else {
                    console.log("No artists found");
                }
            }
        };
        fetchData();
    }, [user?.username]);

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

    return connected ? (
        <div className="h-full w-full">
            <main className="flex w-full">
                <div className="h-full w-full flex flex-col lg:flex-row-reverse lg:justify-between ">
                    <div className="flex flex-col lg:flex-1 w-full lg:items-end lg:pl-1">
                        <Description photoProfile={user?.image || "/pp-image-ex.jpg"} userName={user?.username || "Jean-Michel"} preference={user?.favoritCat || "Art"} account_birthday="17/11/2023" />
                        <h2 className="text-xl font-bold mb-2 cursor-text mt-3">Mes abonnements</h2>
                        {!followings || followings.length === 0 ? <p>Vous ne suivez personne pour le moment</p> : null}
                        <div className="flex flex-row lg:flex-col w-full lg:w-48 overflow-x-scroll lg:overflow-hidden">
                            {followings && followings.length > 0 && followings.map((artist) => <Friend key={artist.id} userName={artist.id} photoProfile={artist.image} />)}
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
                                <div className="max-w-[800px] mx-auto">{posts && posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}</div>
                            </div>
                        )}
                        {section === "liked" && <div className="max-w-[800px] mx-auto">{likes && likes.length > 0 && likes.map((post) => <Post key={post._id} {...post} isLiked />)}</div>}
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
                                    {galerie && galerie.length > 0 && galerie.map((post) => <DiscoverPost key={post._id} {...post} autoPlaying={autoPlaying} scaleEffect={false} />)}
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
