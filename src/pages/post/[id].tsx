import React, { useState } from "react";
import { getAllArt, getArtBasedOnIDFromDb } from "../api/artAPI";
import { Oeuvre } from "../../../types/oeuvre";
import AuthorItem from "../../components/authorItem";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle, FaPlusCircle, FaShareAlt } from "react-icons/fa";

const PostPage: React.FC<{ art: Oeuvre }> = () => {
    const art: Oeuvre = {
        _id: 789,
        title: "Le baiser",
        description:
            "Le Baiser est un tableau du peintre autrichien Gustav Klimt, réalisé de 1908 à 1909. Cette peinture à l'huile sur toile recouverte de feuilles d'or est conservée au palais du Belvédère à Vienne. L'œuvre fait partie du Cycle d'or de Klimt et elle est sûrement la plus célèbre du peintre autrichien.\nL'auteur lui-même et sa compagne, Emilie Flöge, en sont probablement les modèles. \nLe tableau est au format carré dont les deux personnages occupent le centre-haut. Elle représente un homme qui embrasse une femme sur la joue. Le couple est enlacé, la femme est à genou. Alors que les motifs du vêtement masculin sont des quadrilatères noirs et en or, les motifs du vêtement féminin sont ronds, colorés et font penser à des fleurs.\nSe tenant debout, et penché sur sa compagne, l'homme est vêtu d'une robe jaune avec des formes géométriques dont des rectangles gris, noir, blanc. Il porte sur la tête une couronne de feuilles de lierre et son visage tourné vers celui de sa compagne est invisible. Comme dans toutes les représentations d'étreintes de Klimt, on ne voit pas le visage de l'homme. Il semble dominer la femme.\nAgenouillée, la femme porte elle aussi une robe jaune mais différente de celle de l'homme, avec des cercles multicolores. Sa chevelure est fleurie et sa peau est pâle comme celle d'une défunte. Sa tête penchée fait penser à la décapitation, un thème cher aux peintres symbolistes. Le visage de la femme, aux yeux clos, est entièrement visible. Son regard exprime l'extase. Son vêtement cache entièrement l'homme mais celui de la femme la révèle en partie : bras gauche, mollets et pieds, courbes du corps.\nLes mains sont visibles : l'homme enserre la tête de sa compagne, dont le visage est tourné vers le spectateur, sa main droite la tenant par le menton et la joue gauche, et sa main gauche soutenant par la nuque la tête fortement rejetée en arrière. La femme quant à elle pose sa main droite sur la nuque de son compagnon et tient de sa main gauche la main droite de l'homme.\nLe sol à leurs pieds est densément couvert de fleurs et de motifs végétaux, qui tranchent avec un arrière-plan abstrait, plus uniforme, aux tonalités dorées. Cet arrière-plan a été obtenu grâce à de l'emploi de poudre dorée. Gustave Klimt aimait les fleurs qui poussaient abondamment dans son jardin. Les serpentins dorés sous les pieds de la femme font penser à des cheveux stylisés.",
        category: "peinture",
        subCategory: "huile",
        illustration: ["https://picsum.photos/450", "https://picsum.photos/1455", "https://picsum.photos/464/700", "https://picsum.photos/1450/700"],
        video: "https://www.youtube.com/watch?v=MrzIYb9VGlY&pp=ygUSbGUgYmFpc2VyIGRlIGtsaW10",
        postDate: new Date(),
        releaseDate: new Date("1908-01-01"),
        isMediaTypeImages: true,
        author: "Gustav Klimt",
        likeCount: 2,
        toSell: true,
        price: 1000000,
        canTchat: true,
        linkToBuy: "#",
    };

    const [liked, setLiked] = useState(false);
    const [displayedLikeCount, setDisplayedLikeCount] = useState(art.likeCount); //TODO: Change this to the real like count from the database [likeCount]
    const [listed, setListed] = useState(false);
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

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col xl:flex-row w-full">
                <div className="flex flex-col w-full xl:w-[70%] space-y-2">
                    <div className="w-auto mr-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-smibold font-artlas-logo w-auto ">{art.title}</h2>
                        <hr className=" border-black dark:border-white border-2 rounded-full mb-1" />
                    </div>
                    <div className="m-1 rounded-xl object-contain bg-stone-50 dark:bg-[#070504] hover:bg-stone-100 hover:dark:bg-stone-950">
                        {art.isMediaTypeImages && art.illustration ? (
                            <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={true} emulateTouch={true} dynamicHeight={true}>
                                {art.illustration.map((image, index) => (
                                    <div key={index} className="cursor-grab active:cursor-grabbing">
                                        <img
                                            src={image}
                                            alt={`Illustration ${index + 1}`}
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
                            {art.subCategory && (
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
                        <span className="text-lg cursor-text justify-end ml-auto">Posté le {art.postDate.toLocaleDateString()}</span>
                    </div>
                    <AuthorItem authorName={art.author} releaseDate={art.releaseDate?.toLocaleDateString() || undefined} imageSrc="https://picsum.photos/200" linkToProfile="#" />
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
                        >
                            <FaShareAlt className="h-7 w-7" />
                            <span className="flex">Partager</span>
                        </button>
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
    );
};

export default PostPage;

// export async function getStaticPaths() {
//     const arts = await getAllArt();
//     const paths = arts.map((art: { _id: any }) => ({
//         params: { id: art._id },
//     }));

//     return { paths, fallback: false };
// }

// import { GetStaticPropsContext } from "next";

// export async function getStaticProps({ params }: GetStaticPropsContext) {
//     const art = await getArtBasedOnIDFromDb(params?.id as string);

//     return {
//         props: {
//             art,
//         },
//     };
// }
