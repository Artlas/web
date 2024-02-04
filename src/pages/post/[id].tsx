import React, { useEffect, useState } from "react";
import { getAllArtIDs, getArtBasedOnID } from "../../api/artAPI";
import { Oeuvre } from "../../../types/oeuvre";
import AuthorItem from "../../components/authorItem";
import ShareMenu from "../../components/shareMenu";
import E404 from "../404";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle, FaPlusCircle, FaShareAlt } from "react-icons/fa";
import { GetStaticPropsContext } from "next";
import Image from "next/image";

const PostPage: React.FC<{ art: Oeuvre }> = ({ art }) => {
    const [liked, setLiked] = useState(false);
    const [displayedLikeCount, setDisplayedLikeCount] = useState(art?.likeCount || 0);
    const [listed, setListed] = useState(false);
    const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const handleLikeClick = () => {
        setLiked(!liked);
        liked ? setDisplayedLikeCount(displayedLikeCount - 1) : setDisplayedLikeCount(displayedLikeCount + 1);
    };
    const handleListClick = () => {
        setListed(!listed);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Envoi du message");
        e.currentTarget.reset();
    };

    return art ? (
        <div className="flex flex-col w-full">
            <div className="flex flex-col xl:flex-row w-full">
                <div className="flex flex-col w-full xl:w-[70%] space-y-2">
                    <div className="w-auto mr-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-smibold font-artlas-logo w-auto ">
                            {art.title.replaceAll("é", "é ").replaceAll("è", "è ").replaceAll("ê", "ê ").replaceAll("à", "à ").replaceAll("'", "´")}
                        </h2>
                        <hr className=" border-black dark:border-white border-2 rounded-full mb-1" />
                    </div>
                    <div className="m-1 rounded-xl object-contain bg-stone-50 dark:bg-[#070504] hover:bg-stone-100 hover:dark:bg-stone-950">
                        {art.isMediaTypeImages && art.illustration ? (
                            <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={true} emulateTouch={true} dynamicHeight={true}>
                                {art.illustration.map((image, index) => (
                                    <div key={index} className="cursor-grab active:cursor-grabbing">
                                        <Image
                                            src={"data:image/*;base64," + image}
                                            alt={`Illustration ${index + 1}`}
                                            width={1000}
                                            height={1000}
                                            className="w-auto h-auto max-h-56 sm:max-h-80 md:max-h-96 lg:max-h-[450px] 2xl:max-h-[550px] max-w-full object-contain rounded-xl cursor-grabbing select-none"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            //TODO: Read the video URL and render the video player
                            art.video && (
                                <div className="relative w-full h-56 sm:h-80 md:h-96 lg:h-[450px] 2xl:h-[550px] rounded-lg object-contain">
                                    <ReactPlayer url={art.video} width="100%" height="100%" controls={true} volume={0.5} />
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 m-3 justify-between" id="postCategoryContainer">
                        <div>
                            <Link href={`/${art.category.toLowerCase()}/all`} id={`post${art._id}CategoryLink`}>
                                <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-md py-1 px-3 rounded-full mr-2 text-lg">
                                    {art.category
                                        .split(" ")
                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")
                                        .replaceAll("_", " ")}
                                </span>
                            </Link>
                            {art.subCategory && art.subCategory !== "all" && (
                                <Link href={`/${art.category.toLowerCase()}/${art.subCategory.toLowerCase()}`} id={`post${art._id}SubcategoryLink`}>
                                    <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-md py-1 px-3 rounded-full mr-2 text-lg">
                                        {art.subCategory
                                            .split(" ")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")
                                            .replaceAll("_", " ")}
                                    </span>
                                </Link>
                            )}
                        </div>
                        <span className="text-lg cursor-text justify-end ml-auto">Posté le {art.postDate ? new Date(art.postDate).toLocaleDateString() : undefined}</span>
                    </div>
                    <AuthorItem
                        authorName={art.author}
                        releaseDate={art.releaseDate ? new Date(art.releaseDate).toLocaleDateString() : undefined}
                        imageSrc="https://picsum.photos/200"
                        linkToProfile="#"
                    />
                    <div className="flex flex-col p-3 bg-stone-100 dark:bg-stone-950 text-black dark:text-white hover:text-gray-800 hover:bg-stone-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-stone-300 active:dark:bg-stone-900 rounded-xl">
                        <span className="font-semibold text-xl ">Description : </span>
                        <p className="text-xl" dangerouslySetInnerHTML={{ __html: art.description.replace(/\n/g, "<br><br>") }}></p>
                    </div>
                </div>
                <div className="flex flex-col w-full xl:w-[30%] space-y-2 ml-4">
                    {/* Render like, add to list, and share buttons */}
                    <div className="flex flex-col justify-between items-center  mt-4 px-4 space-y-2 text-2xl ">
                        <button
                            id={`post${art._id}LikeButton`}
                            className={`flex items-center space-x-2 p-3 rounded-full bg-stone-100 dark:bg-stone-950  hover:bg-stone-200  hover:dark:bg-stone-800 active:bg-stone-300 active:dark:bg-stone-900  shadow-md ${
                                liked ? "text-red-500  active:text-red-600" : "text-gray-800 dark:text-slate-300 active:text-gray-950 active:dark:text-gray-400"
                            }`}
                            onClick={handleLikeClick}
                            type="button"
                        >
                            <FaHeart className="h-7 w-7" />
                            <span className="flex text-black dark:text-white">{"J'aime"}</span>
                            <span className="flex text-black dark:text-white">{displayedLikeCount}</span>
                        </button>
                        <button
                            id={`post${art._id}AddToListButton`}
                            className={`flex items-center space-x-2 p-3 rounded-full bg-stone-100 dark:bg-stone-950 text-black dark:text-white hover:text-gray-800 hover:bg-stone-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-stone-300 active:dark:bg-stone-900  shadow-md ${
                                listed
                                    ? "text-black dark:text-white active:text-gray-800 active:dark:text-gray-400"
                                    : "text-gray-800 dark:text-slate-300 active:text-gray-900 active:dark:text-gray-400"
                            }`}
                            onClick={handleListClick}
                            type="button"
                        >
                            {listed ? (
                                <div className="flex flex-row justify-between gap-2 items-center">
                                    <FaCheckCircle className="h-7 w-7 sm:mt-[2px]" /> <span className="flex">Dans ma liste</span>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between gap-2 items-center ">
                                    <FaPlusCircle className="h-7 w-7 sm:mt-[2px]" />
                                    <span className="flex ">Ajouter à ma liste</span>
                                </div>
                            )}
                        </button>
                        <button
                            id={`post${art._id}ShareButton`}
                            className="flex items-center space-x-2 p-3 rounded-full bg-stone-100 dark:bg-stone-950 text-black dark:text-white hover:text-gray-800 hover:bg-stone-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-stone-300 active:dark:bg-stone-900 active:text-gray-900 active:dark:text-gray-400 shadow-md "
                            type="button"
                            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                        >
                            <FaShareAlt className="h-7 w-7" />
                            <span className="flex">Partager</span>
                        </button>
                        {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                        <ShareMenu postLink={`https://fournierfamily.ovh/post/${art._id}`} isOpen={isShareMenuOpen} detailed />
                    </div>
                    {/* Render buy and tchat information */}
                    {art?.toSell || art?.canTchat ? (
                        <div className="flex flex-col p-3 bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-xl shadow-xl w-full mx-auto">
                            {art?.toSell && (
                                <div>
                                    <span className="font-semibold text-2xl">{"Cette oeuvre est à vendre"} </span>
                                    <div className="flex flex-col">
                                        <span className="text-xl ml-3">Prix : {art?.price} €</span>
                                        <Link
                                            href={art?.linkToBuy || "#"}
                                            className="flex flex-row items-center w-auto mr-auto text-xl  justify-between hover:bg-stone-200 hover:dark:bg-stone-800 active:bg-stone-300 active:dark:bg-stone-900  py-1 px-3 rounded-full"
                                        >
                                            <span>Acheter</span> <IoMdArrowRoundForward className="ml-2" size={30} />
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {art?.canTchat && (
                                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                                    <label htmlFor="tchat" className="font-semibold text-2xl">
                                        {"Contacter l'artiste"}{" "}
                                    </label>
                                    <textarea name="tchat" id="tchat" className="w-full h-32 p-2 rounded-xl bg-stone-200 dark:bg-stone-900"></textarea>
                                    <button
                                        type="submit"
                                        className="flex flex-row items-center w-auto ml-auto bg-black dark:bg-white border-2 p-1 pl-3 rounded-full border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                                    >
                                        <span>Envoyer</span> <IoMdArrowRoundForward className="ml-2" size={30} />
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    ) : (
        <E404 />
    );
};

export default PostPage;

export async function getStaticPaths() {
    const arts = await getAllArtIDs();
    const paths = arts.map((_id: string) => ({
        params: { id: _id.toString() },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    let art: any;

    try {
        art = await getArtBasedOnID(params?.id as any);
    } catch (error) {
        console.error("Error getting art: ", error);
    }
    return {
        props: {
            art,
        },
    };
}
