import React, { useState, useContext, useEffect } from "react";
import { Oeuvre } from "@/types/oeuvre";
import Post from "../../components/post";
import E404 from "../404";
import Masonry from "react-masonry-css";
import { UserContext } from "../../components/userContext";
import { Friend } from "../../components/profileDes";
import { Description } from "../../components/profileDes";
import { Liste } from "../../components/profileDes";
import DiscoverPost from "@/src/components/discoverPost";
import { getAllUsers, retrieveInfoUserById } from "@/src/api/userAPI";
import { getArtsBasedOnIDFromDb } from "@/src/api/artAPI";
import { getArtOfArtistBasedOnId, retrieveArtLikedByUser } from "@/src/utils/artHandler";
import { followArtist, unfollowArtist } from "@/src/api/commuAPI";
import { FaUserPlus, FaUserCheck } from "react-icons/fa6";
import { retrieveFollowedArtists } from "@/src/utils/communityHandler";

export default function Profile({ user }: any) {
    const [section, setSection] = useState("post");
    const [posts, setPosts] = useState<Oeuvre[]>([]);
    const [likes, setLikes] = useState<Oeuvre[]>([]);
    const [galerie, setGalerie] = useState<Oeuvre[]>([]);
    const [following, setFollowing] = useState<boolean>(false);
    const [followings, setFollowings] = useState<any[]>([]);
    const handleItemClickPost = () => {
        setSection("post");
    };
    const handleItemClickLiked = () => {
        setSection("liked");
    };
    const handleItemClickGalerie = () => {
        setSection("galerie");
    };
    const { user: currentUser, setUserNeeded } = useContext(UserContext);

    const handleFollowClick = async () => {
        if (currentUser && currentUser.following !== undefined) {
            const isFollowing = currentUser.following.includes(user?.id);
            currentUser.following = isFollowing ? currentUser.following.filter((friendId) => friendId !== user?.id) : [...currentUser.following, user?.id];
            try {
                if (isFollowing) {
                    await unfollowArtist(user?.id, currentUser);
                    setFollowing(false);
                } else {
                    await followArtist(user?.id, currentUser);
                    setFollowing(true);
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'état de suivi :", error);
            }
        } else if (currentUser) {
            currentUser.following = [user?.id];
            try {
                await followArtist(user?.id, currentUser);
            } catch (error) {
                console.error("Erreur lors du suivi de l'utilisateur :", error);
            }
        } else {
            setUserNeeded(true);
            console.error("currentUser is undefined");
        }
    };

    useEffect(() => {
        if (posts.length === 0 && likes.length === 0) {
            const fetchData = async () => {
                let data = await getArtOfArtistBasedOnId(user?.id || "");
                sortPostsByMostRecentPostDate(data);
                setPosts(data);
                console.log("Posts:", data);
                data = await retrieveArtLikedByUser(user?.id || "");

                if (data !== undefined && data.length > 0) {
                    sortPostsByMostRecentPostDate(data);
                    setLikes(data);
                    console.log("Likes:", data);
                } else {
                    console.log("No likes found");
                }
            };
            fetchData();
        }
        if (currentUser && currentUser.following !== undefined) {
            setFollowing(currentUser.following.includes(user?.id));
            console.log("Utilisateurs suivis:", currentUser.following);
        }
    }, []);

    useEffect(() => {
        if (galerie.length === 0 && posts.length > 0) {
            const fetchData = async () => {
                let data = [] as Oeuvre[];
                posts.forEach((post) => {
                    post.isInGallery && data.push(post);
                });
                sortPostsByMostRecentPostDate(data);
                setGalerie(data);
                console.log("Galerie:", data);
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
            if (user?.id) {
                const artists = await retrieveFollowedArtists(user?.id);
                if (artists !== undefined) {
                    console.log("Artists found:", artists);
                    setFollowings(artists);
                } else {
                    console.log("No artists found");
                }
            }
        };
        fetchData();
    }, [user?.id]);

    const breakpointColumnsObj = {
        default: 1,
        2600: 4,
        2100: 3,
        1750: 2,
        1100: 1,
        500: 1,
    };
    // variable qui contient un tableau des oeuvres d'arts du user
    let userArts;

    async function fetchUserArts() {
        console.log(user?.id);
        userArts = await getArtsBasedOnIDFromDb(user?.id);
    }

    fetchUserArts();

    return (
        <div className="h-full w-full">
            <main className="flex w-full">
                <div className="h-full w-full flex flex-col lg:flex-row-reverse lg:justify-between ">
                    <div className="flex flex-col lg:flex-1 w-full lg:items-end lg:pl-1">
                        <Description
                            photoProfile={user?.image || "/pp-image-ex.jpg"}
                            userName={user?.id || "Jean-Michel"}
                            preference={user?.favoritCat || "Photographie"}
                            account_birthday="17/11/2023"
                            FollowButton={
                                currentUser?.username !== user?.id && (
                                    <button
                                        type="button"
                                        id="followButton"
                                        onClick={handleFollowClick}
                                        className={`bg-black dark:bg-white text-white dark:text-black rounded-lg ${
                                            following
                                                ? "hover:bg-red-700 dark:hover:bg-red-300 dark:active:bg-red-400 active:bg-red-800 "
                                                : "hover:bg-stone-800 dark:hover:bg-gray-200 dark:active:bg-gray-300 active:bg-stone-900"
                                        } px-4 p-2 font-semibold`}
                                    >
                                        {following ? (
                                            <span className="flex flex-row items-center">
                                                Suivi <FaUserCheck className="ml-2" />
                                            </span>
                                        ) : (
                                            <span className="flex flex-row items-center">
                                                Suivre <FaUserPlus className="ml-2" />
                                            </span>
                                        )}
                                    </button>
                                )
                            }
                        />
                        <h2 className="text-xl font-bold mb-2 cursor-text mt-3">Les abonnements de {user?.id}</h2>
                        <div className="flex flex-row lg:flex-col w-full lg:w-48 overflow-x-scroll lg:overflow-hidden">
                            {followings && followings.length > 0 && followings.map((artist) => <Friend key={artist.id} photoProfile={artist.image} userName={artist.id} />)}
                        </div>
                    </div>
                    <div className="flex flex-col px-1">
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
                        {section === "liked" && <div className="max-w-[800px] mx-auto">{likes && likes.length > 0 && likes.map((post) => <Post key={post._id} {...post} />)}</div>}
                        {section === "galerie" && (
                            <div className="">
                                <Masonry className="flex flex-wrap mt-4" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                                    {galerie &&
                                        galerie.length > 0 &&
                                        galerie.map((post) => <DiscoverPost key={post._id} {...post} autoPlaying={currentUser?.autoPlayDiaporamas || false} scaleEffect={false} />)}
                                </Masonry>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
export async function getStaticPaths() {
    try {
        const users = await getAllUsers();
        console.log(users);

        if (!Array.isArray(users)) {
            throw new Error("getAllUsers did not return an array");
        }

        const paths = users.map((id: string) => ({
            params: { id: id },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error("Error in getStaticPaths:", error);
        throw error; // Re-throw the error to fail the build
    }
}

export async function getStaticProps({ params }: any) {
    // Utilisez votre fonction pour obtenir les détails de l'utilisateur
    const user = await retrieveInfoUserById(params?.id as any);

    // Si l'utilisateur n'existe pas, retournez { notFound: true }
    if (!user) {
        return { notFound: true };
    }

    return { props: { user } };
}
