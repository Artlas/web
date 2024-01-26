import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Oeuvre } from "@/types/oeuvre";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle, FaPlusCircle, FaShareAlt } from "react-icons/fa";

const Post: React.FC<Oeuvre> = ({ _id, title, description, category, subCategory, illustration, video, postDate, releaseDate, isMediaTypeImages, likeCount }) => {
    const [liked, setLiked] = useState(false);
    const [displayedLikeCount, setDisplayedLikeCount] = useState(likeCount); //TODO: Change this to the real like count from the database [likeCount]
    const [listed, setListed] = useState(false);
    const [index, setIndex] = useState(0);
    const handleLikeClick = () => {
        setLiked(!liked);
        liked ? setDisplayedLikeCount(displayedLikeCount - 1) : setDisplayedLikeCount(displayedLikeCount + 1);
    };
    const handleListClick = () => {
        setListed(!listed);
    };

    let router = useRouter();

    const handlePostClick = () => {
        console.log("Clique sur l'arrière-plan de la div");
        router.push(`/post/${_id}`);
    };

    const handleOpenImage = () => {
        // open the selected image in full screen
        if (illustration) {
            let image = illustration[index];
            window.open(image);
        }
    };

    return (
        <div
            className="bg-white dark:bg-black hover:bg-stone-100 dark:hover:bg-stone-950 rounded-xl shadow-lg dark:shadow-none border dark:border-stone-700 p-4 mt-4 cursor-pointer"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handlePostClick();
                }
            }}
            id="postContainer"
        >
            <div
                className="flex justify-between"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handlePostClick();
                    }
                }}
                id="postHeaderContainer"
            >
                <h2 className="text-lg font-bold mb-2 cursor-text">{title}</h2>
                <span className="text-gray-600 dark:text-slate-200 text-xs cursor-text">{postDate.toLocaleDateString()}</span>
            </div>
            <div
                className="flex mb-3"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handlePostClick();
                    }
                }}
                id="postCategoryContainer"
            >
                <Link href={`/${category.toLowerCase()}/all`} id={`post${_id}CategoryLink`}>
                    <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-sm py-1 px-3 rounded-full mr-2">{category}</span>
                </Link>
                {subCategory && (
                    <Link href={`/${category.toLowerCase()}/${subCategory.toLowerCase()}`} id={`post${_id}SubcategoryLink`}>
                        <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-sm py-1 px-3 rounded-full mr-2">
                            {subCategory}
                        </span>
                    </Link>
                )}
            </div>
            <div
                className="mb-4 mt-2"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handlePostClick();
                    }
                }}
                id="postIllustrationContainer"
            >
                {/* Render carousel or video player based on illustration type
                //TODO: Add a button to open the real image in full screen
                */}
                {isMediaTypeImages && illustration ? (
                    <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={true} emulateTouch={true} dynamicHeight={true} onClickItem={handleOpenImage}>
                        {illustration.map((image, index) => (
                            <div key={index} className="cursor-alias">
                                <img src={image} alt={`Illustration ${index + 1}`} className="w-auto h-auto max-h-64 sm:max-h-96 max-w-full object-contain cursor-alias" />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    //TODO: Read the video URL and render the video player
                    video && (
                        <div className="relative w-full h-64 sm:h-96">
                            <ReactPlayer url={video} width="100%" height="100%" controls={true} volume={0.5} />
                        </div>
                    )
                )}
            </div>
            <p className="text-gray-600 dark:text-slate-200 mb-4 cursor-text select-all">{description}</p>
            {/*
            //TODO: Render other information
            */}

            <div className="flex justify-between items-center cursor-default">
                <p className=" cursor-text">Oeuvre :</p>
                <span className="text-gray-600 dark:text-slate-200 text-xs cursor-text">{releaseDate?.toLocaleDateString()}</span>
            </div>

            {/* Render like, add to list, and share buttons */}
            <div
                className="flex justify-between items-center mt-4 px-4 md:px-8 lg:px-12 xl:px-16"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handlePostClick();
                    }
                }}
                id="postButtonsContainer"
            >
                <button
                    id={`post${_id}LikeButton`}
                    className={`flex items-center space-x-2 ${liked ? "text-red-500 active:text-red-600" : "text-gray-800 dark:text-slate-300 active:text-gray-950 active:dark:text-gray-400"}`}
                    onClick={handleLikeClick}
                    type="button"
                >
                    <FaHeart className="h-5 w-5" />
                    <span className="hidden md:flex">{"J'aime"}</span>
                    <span className="flex">{displayedLikeCount}</span>
                </button>
                <button
                    id={`post${_id}AddToListButton`}
                    className={`flex items-center space-x-2 ${
                        listed ? "text-black dark:text-white active:text-gray-800 active:dark:text-gray-400" : "text-gray-800 dark:text-slate-300 active:text-gray-900 active:dark:text-gray-400"
                    }`}
                    onClick={handleListClick}
                    type="button"
                >
                    {listed ? (
                        <div className="flex flex-row justify-between gap-2">
                            <FaCheckCircle className="h-5 w-5 sm:mt-[2px]" /> <span className="hidden sm:flex">Dans ma liste</span>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-between gap-2 ">
                            <FaPlusCircle className="h-5 w-5 sm:mt-[2px]" />
                            <span className="hidden sm:flex ">Ajouter à ma liste</span>
                        </div>
                    )}
                </button>
                <button id={`post${_id}ShareButton`} className="flex items-center space-x-2 text-gray-800 dark:text-gray-300 active:text-gray-900 active:dark:text-gray-400" type="button">
                    <FaShareAlt className="h-5 w-5" />
                    <span className="hidden sm:flex">Partager</span>
                </button>
            </div>
        </div>
    );
};

export default Post;
