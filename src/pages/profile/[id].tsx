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

//TODO: replace every temporary item by the real data from the database:
/*
 * - user
 * - posts
 * - liked
 * - friends
 */

//!
/**
 * DANS user on a :
 * id
 * la photo de profil
 * la liste d'id des follow
 * la galerie
 * la liste des oeuvres liké
 */
export default function Profile({ user }: any) {
    const [section, setSection] = useState("post");
    const [posts, setPosts] = useState<Oeuvre[]>([]);
    const [likes, setLikes] = useState<Oeuvre[]>([]);
    const [galerie, setGalerie] = useState<Oeuvre[]>([]);
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
    const handleFollowClick = () => {
        if (currentUser && currentUser.friends !== undefined) {
            currentUser.friends = currentUser.friends.includes(user?.id) ? currentUser.friends.filter((friendId) => friendId !== user?.id) : [...currentUser.friends, user?.id];
            //TODO: update the user in the database
        } else if (currentUser) {
            currentUser.friends = [user?.id];
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
                if (data.length > 0) {
                    sortPostsByMostRecentPostDate(data);
                    setLikes(data);
                    console.log("Likes:", data);
                } else {
                    console.log("No likes found");
                }
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (galerie.length === 0) {
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

    //TODO
    /*
    useEffect(() => {
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
    }, [user?.username]);*/
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
    // TODO
    // fetch les oeuvres de l'"artiste" pour les afficher
    const tempPost2: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        // illustration: ["https://picsum.photos/650/1100", "https://picsum.photos/1455/500"],
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
        // illustration: ["https://picsum.photos/1600/900", "https://picsum.photos/1455/800", "https://picsum.photos/469/700"],
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
        // illustration: ["https://picsum.photos/1600/800"],
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
                            userName={user?.id || "Jean-Michel"}
                            preference={user?.favoritCat || "Photographie"}
                            account_birthday="17/11/2023"
                            FollowButton={
                                <button
                                    type="button"
                                    id="followButton"
                                    onClick={handleFollowClick}
                                    className="bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-stone-800 dark:hover:bg-gray-200 dark:active:bg-gray-300 active:bg-stone-900 px-4 p-2 font-semibold"
                                >
                                    {/*user && user.following.contains */}
                                    Suivre
                                </button>
                            }
                        />
                        <h2 className="text-xl font-bold mb-2 cursor-text mt-3">Les abonnements de {user?.id}</h2>
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
