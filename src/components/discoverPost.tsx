import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Oeuvre } from "@/types/oeuvre";
import AuthorItem from "./authorItem";
import ShareMenu from "./shareMenu";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle, FaPlusCircle, FaShareAlt } from "react-icons/fa";

interface DiscoverPostProps extends Oeuvre {
    autoPlaying: boolean;
    scaleEffect: boolean;
}

const DiscoverPost: React.FC<DiscoverPostProps> = ({
    _id,
    title,
    description,
    category,
    subCategory,
    illustration,
    video,
    postDate,
    releaseDate,
    isMediaTypeImages,
    autoPlaying,
    author,
    likeCount,
    scaleEffect,
}) => {
    const [liked, setLiked] = useState(false);
    const [displayedLikeCount, setDisplayedLikeCount] = useState(likeCount);
    const [listed, setListed] = useState(false);
    const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const handleLikeClick = () => {
        setLiked(!liked);
        liked ? setDisplayedLikeCount(displayedLikeCount - 1) : setDisplayedLikeCount(displayedLikeCount + 1);
    };
    const handleListClick = () => {
        setListed(!listed);
    };

    let router = useRouter();

    const handlePostClick = () => {
        //console.log("Clique sur l'arrière-plan de la div");
        router.push(`/post/${_id}`);
    };

    const useMousePosition = () => {
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        useEffect(() => {
            const updateMousePosition = (ev: any) => {
                setMousePosition({ x: ev.clientX, y: ev.clientY });
            };
            window.addEventListener("mousemove", updateMousePosition);
            return () => {
                window.removeEventListener("mousemove", updateMousePosition);
            };
        }, []);
        return mousePosition;
    };

    return (
        <div className={`my-3 sm:mx-1 ${scaleEffect ? "hover:my-5" : ""} `}>
            <div
                className={`relative bg-white dark:bg-black  rounded-xl shadow-lg dark:shadow-none border dark:border-stone-700 group-hover:bg-[#121212AA]
            cursor-pointer m-1 overflow-hidden group hover:shadow-xl hover:bg-[#121212AA] ${scaleEffect ? "hover:scale-y-105 hover:z-10 transition duration-300 ease-in-out" : ""} `}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handlePostClick();
                    }
                }}
                onMouseEnter={() => setIsPlaying(true)}
                onMouseLeave={() => setIsPlaying(false)}
                id="discoverPostContainer"
            >
                <div
                    className="relative w-full overflow-hidden  min-h-[150px]"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handlePostClick();
                        }
                    }}
                    id="discoverPostIllustrationContainer"
                >
                    {/* Render carousel or video player based on illustration type
                //TODO: Add a button to open the real image in full screen
                */}
                    {isMediaTypeImages && illustration && (
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop={true}
                            showArrows={true}
                            showIndicators={!isPlaying}
                            emulateTouch={true}
                            dynamicHeight={true}
                            autoPlay={isPlaying && autoPlaying}
                            interval={3100}
                        >
                            {illustration.map((image, index) => (
                                <div key={index} className="select-none">
                                    <img
                                        src={"data:image/*;base64," + image}
                                        alt={`Illustration ${index + 1}`}
                                        className="w-auto min-h-[150px] h-auto max-h-96 sm:max-h-none max-w-full object-contain "
                                    />
                                </div>
                            ))}
                        </Carousel>
                    )}
                </div>

                <div className="hidden group-hover:block absolute top-0 h-full pb-6 w-full p-2 group-hover:bg-[#e1e1e188] dark:group-hover:bg-[#121212AA] overflow-y-scroll no-scrollbar ">
                    <div
                        className="flex justify-between"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handlePostClick();
                            }
                        }}
                        id="discoverPostTitleContainer"
                    >
                        <h2 className="text-lg font-bold cursor-text">{title}</h2>
                        <span className="text-gray-800 dark:text-slate-200 text-xs cursor-text">{postDate ? new Date(postDate).toLocaleDateString() : undefined}</span>
                    </div>
                    <div
                        className="flex items-center my-1"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handlePostClick();
                            }
                        }}
                        id="discoverPostCategoryContainer"
                    >
                        <Link href={`/${category.toLowerCase()}/all`} id={`discoverPost${_id}CategoryLink`}>
                            <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-sm px-3 py-1 rounded-full mx-2 dark:border dark:border-stone-700">
                                {category.charAt(0).toUpperCase() + category.slice(1).replaceAll("_", " ")}
                            </span>
                        </Link>
                        {subCategory && subCategory !== "all" && (
                            <Link href={`/${category.toLowerCase()}/${subCategory.toLowerCase()}`} id={`discoverPost${_id}SubcategoryLink`}>
                                <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-sm px-3 py-1 rounded-full mr-2 dark:border dark:border-stone-700">
                                    {subCategory.charAt(0).toUpperCase() + subCategory.slice(1).replaceAll("_", " ")}
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="my-1">
                        <AuthorItem imageSrc="" authorName={author} linkToProfile={"/profile/" + author} releaseDate={releaseDate ? new Date(releaseDate).toLocaleDateString() : undefined} small />
                    </div>

                    <p className="text-black dark:text-white cursor-text select-none mt-1">{description}</p>
                </div>
                <div className="hidden group-hover:block group-hover:flex-col-reverse absolute bottom-1 align-bottom w-full px-2 overflow-hidden  z-20 ">
                    {/* Render like, add to list, and share buttons */}
                    <div
                        className="flex justify-between items-center px-4 md:px-8 "
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handlePostClick();
                            }
                        }}
                        id="discoverPostButtonsContainer"
                    >
                        <div className="hover:bg-[#e1e1e188] dark:hover:bg-[#121212AA] flex justify-between items-center w-full py-1 px-2 rounded-full">
                            <button
                                id={`discoverPost${_id}LikeButton`}
                                className={`flex items-center space-x-2 ${
                                    liked ? "text-red-500 active:text-red-600" : "text-gray-800 dark:text-slate-300 active:text-gray-900 active:dark:text-gray-400"
                                }`}
                                onClick={handleLikeClick}
                                type="button"
                            >
                                <FaHeart className="h-5 w-5" />
                                <span className="sr-only">{"J'aime"}</span>
                                <span className="flex">{displayedLikeCount}</span>
                            </button>
                            <button
                                id={`discoverPost${_id}AddToListButton`}
                                className={`flex items-center space-x-2 ${
                                    listed
                                        ? "text-black dark:text-white active:text-gray-800 active:dark:text-gray-400"
                                        : "text-gray-800 dark:text-slate-300 active:text-gray-900 active:dark:text-gray-400"
                                }`}
                                onClick={handleListClick}
                                type="button"
                            >
                                {listed ? (
                                    <div className="flex flex-row justify-between gap-2">
                                        <FaCheckCircle className="h-5 w-5 sm:mt-[2px]" /> <span className="sr-only">Dans ma liste</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-row justify-between gap-2 ">
                                        <FaPlusCircle className="h-5 w-5 sm:mt-[2px]" />
                                        <span className="sr-only ">Ajouter à ma liste</span>
                                    </div>
                                )}
                            </button>
                            <button
                                id={`discoverPost${_id}ShareButton`}
                                className="flex items-center space-x-2 text-gray-800 dark:text-gray-300 active:text-gray-900 active:dark:text-gray-400"
                                type="button"
                                onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                            >
                                <FaShareAlt className="h-5 w-5" />
                                <span className="sr-only">Partager</span>
                            </button>
                            <ShareMenu postLink={`https://fournierfamily.ovh/post/${_id}`} isOpen={isShareMenuOpen} x={useMousePosition().x} y={useMousePosition().y} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverPost;
