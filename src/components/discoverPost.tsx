import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle, FaPlusCircle, FaShareAlt } from "react-icons/fa";

interface PostProps {
    id: number;
    title: string;
    description: string;
    category: string;
    subCategory?: string;
    illustration?: string[];
    video?: string;
    postDate: Date;
    releaseDate?: Date;
    isMediaTypeImages: boolean;
    // Add other fields based on post category

    autoPlaying?: boolean;
}

const DiscoverPost: React.FC<PostProps> = ({ id, title, description, category, subCategory, illustration, video, postDate, releaseDate, isMediaTypeImages, autoPlaying }) => {
    const [liked, setLiked] = useState(false);
    const [listed, setListed] = useState(false);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const handleLikeClick = () => {
        setLiked(!liked);
    };
    const handleListClick = () => {
        setListed(!listed);
    };

    let router = useRouter();

    const handlePostClick = () => {
        console.log("Clique sur l'arrière-plan de la div");
        //router.push(`/post/${id}`);
    };

    const handleOpenImage = () => {
        // open the selected image in full screen
        if (illustration) {
            let image = illustration[index];
            window.open(image);
        }
    };

    return (
        <div className="my-3 sm:mx-1 hover:my-5">
            <div
                className="relative bg-white dark:bg-black  rounded-xl shadow-lg dark:shadow-none border dark:border-stone-700 group-hover:bg-[#121212AA]
            cursor-pointer m-1 overflow-hidden group hover:shadow-xl hover:bg-[#121212AA] hover:scale-y-105 hover:z-10 transition duration-300 ease-in-out"
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
                                    <img src={image} alt={`Illustration ${index + 1}`} className="w-auto min-h-[150px] h-auto max-h-96 sm:max-h-none max-w-full object-contain " />
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
                        <span className="text-gray-800 dark:text-slate-200 text-xs cursor-text">{postDate.toLocaleDateString()}</span>
                    </div>
                    <div
                        className="flex"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handlePostClick();
                            }
                        }}
                        id="discoverPostCategoryContainer"
                    >
                        <Link href={`/${category.toLowerCase()}/all`} id={`discoverPost${id}CategoryLink`}>
                            <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-sm  px-3 rounded-full mr-2 dark:border dark:border-stone-700">
                                {category}
                            </span>
                        </Link>
                        {subCategory && (
                            <Link href={`/${category.toLowerCase()}/${subCategory.toLowerCase()}`} id={`discoverPost${id}SubcategoryLink`}>
                                <span className="bg-stone-200 text-gray-700 dark:bg-stone-800 dark:text-gray-200 hover:bg-stone-300 hover:dark:bg-stone-700 shadow-sm  px-3 rounded-full mr-2 dark:border dark:border-stone-700">
                                    {subCategory}
                                </span>
                            </Link>
                        )}
                    </div>

                    <p className="text-black dark:text-white cursor-text select-none mt-1">{description}</p>
                    {/*
            //TODO: Render other information
            */}

                    <div
                        className="flex justify-between items-center cursor-default mt-1"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handlePostClick();
                            }
                        }}
                        id="discoverPostOtherInfoContainer"
                    >
                        <p className=" cursor-text">Oeuvre :</p>
                        <span className="text-gray-800 dark:text-slate-200 text-xs cursor-text">{releaseDate?.toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="hidden group-hover:block group-hover:flex-col-reverse absolute bottom-1 align-bottom w-full px-2 overflow-hidden  z-20 ">
                    {/* Render like, add to list, and share buttons */}
                    <div
                        className="flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 "
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handlePostClick();
                            }
                        }}
                        id="discoverPostButtonsContainer"
                    >
                        <div className="hover:bg-[#e1e1e188] dark:hover:bg-[#121212AA] flex justify-between items-center w-full py-1 px-2 rounded-full">
                            <button
                                id={`discoverPost${id}LikeButton`}
                                className={`flex items-center space-x-2 ${liked ? "text-red-500" : "text-gray-800 dark:text-slate-300"}`}
                                onClick={handleLikeClick}
                                type="button"
                            >
                                <FaHeart className="h-5 w-5" />
                                <span className="sr-only">{"J'aime"}</span>
                            </button>
                            <button
                                id={`discoverPost${id}AddToListButton`}
                                className={`flex items-center space-x-2 ${listed ? "text-black dark:text-white" : "text-gray-800 dark:text-slate-300"}`}
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
                            <button id={`discoverPost${id}ShareButton`} className="flex items-center space-x-2 text-gray-800 dark:text-slate-300" type="button">
                                <FaShareAlt className="h-5 w-5" />
                                <span className="sr-only">Partager</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverPost;
