import React, { useState, useEffect, useContext } from "react";
import { addArt, checkIfArtExist } from "../api/artAPI";

import { ArtContext } from "../components/artContext";
import { getRandomInt } from "../utils/tools";
import { Oeuvre } from "@/types/oeuvre";
import { UserContext } from "../components/userContext";
import { CategoryContext } from "../components/categoryContext";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    category?: string;
    subcategory?: string;
}
export default function Poster({ category, subcategory }: Props) {
    //#region variables
    const { user, userNeeded, connected, logout, acceptCookies, setAcceptCookies, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const { categoryList, categoryNameList, subCategoryList, subCategoryNameList, setCategory } = useContext(CategoryContext);
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(category || "");
    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || "");
    const [date, setDate] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState("");
    const [isMediaTypeImages, setIsMediaTypeImages] = useState(true);
    const [description, setDescription] = useState("");
    const [isArtToSell, setIsArtToSell] = useState(false);
    const [price, setPrice] = useState(0);
    const [canPeopleChat, setCanPeopleChat] = useState(true);
    const [linkToBuy, setLinkToBuy] = useState("");
    const [addedToGallery, setAddedToGallery] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    //#endregion
    useEffect(() => {
        if (selectedCategory) {
            setCategory(selectedCategory);
        }
    }, [selectedCategory]);
    //#region handles

    let router = useRouter();
    function redirect() {
        router.push("/");
    }
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubcategoryChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSelectedSubcategory(event.target.value);
    };

    const handleDateChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setDate(event.target.value);
    };

    const handleImageChange = (event: { target: { files: any } }) => {
        setImages(event.target.files);
    };

    const handleVideoChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setVideo(event.target.value);
    };
    //#endregion
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setFormSubmitted(true);
        let oeuvre: Oeuvre = {
            _id: getRandomInt(),
            title: title,
            description: description,
            author: user?.username || "Jean-Michel",
            category: selectedCategory,
            subCategory: selectedSubcategory,
            illustration: images,
            video: video,
            postDate: new Date(),
            releaseDate: date,
            isMediaTypeImages: isMediaTypeImages,
            likeCount: 0,
            toSell: isArtToSell,
            price: price,
            canTchat: canPeopleChat,
            linkToBuy: linkToBuy,
            isInGallery: addedToGallery,
        };

        try {
            await addArt(oeuvre, user).then((response) => {
                if (response) {
                    console.log("Art ajouté avec succès");
                    redirect();
                }
            });
        } catch (error) {
            console.log("Erreur; ", error);
        } finally {
            setFormSubmitted(false);
        }
    };

    return (
        <div className="container mx-auto shadow-md bg-stone-50 dark:bg-stone-900 p-4 rounded-xl">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="titleInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                        Titre de la publication
                    </label>
                    <input
                        type="text"
                        id="titleInputPostCreationForm"
                        value={title}
                        onChange={handleTitleChange}
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        placeholder="Titre de la publication"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categoryInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                        Catégorie
                    </label>
                    <select
                        id="categoryInputPostCreationForm"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 cursor-pointer appearance-none"
                        required
                    >
                        <option value="">Choisir une catégorie</option>
                        {categoryNameList.map((category) => (
                            <option key={category} value={category}>
                                {category.replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedCategory && (
                    <div className="mb-4">
                        <label htmlFor="subcategoryInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                            Sous-catégorie
                        </label>
                        <select
                            id="subcategoryInputPostCreationForm"
                            value={selectedSubcategory}
                            onChange={handleSubcategoryChange}
                            className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 cursor-pointer appearance-none"
                            required
                        >
                            <option value="">Choisir une sous-catégorie</option>
                            {subCategoryNameList.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                    {subcategory.replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="dateInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                        {"Date de création de l'ɶuvre"}
                    </label>
                    <input
                        type="date"
                        id="dateInputPostCreationForm"
                        value={date}
                        onChange={handleDateChange}
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 cursor-text"
                    />
                </div>

                <div className="mb-4 mx-auto flex  flex-col">
                    <label htmlFor="mediaInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                        Type de média
                    </label>
                    <div className="flex flex-row mx-auto rounded-lg shadow-md ">
                        <input type="radio" name="media" id="images" className="hidden" required defaultChecked={true} onClick={() => setIsMediaTypeImages(true)} />
                        <label htmlFor="images" className="flex flex-row items-center cursor-pointer">
                            <div
                                className={`p-1 pr-2 pl-3 ${
                                    isMediaTypeImages
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "bg-stone-100 text-black hover:bg-stone-200 dark:bg-stone-950 dark:text-white dark:hover:bg-stone-800"
                                } rounded-l-md select-none border border-black dark:border-white`}
                            >
                                Images
                            </div>
                        </label>
                        <input type="radio" name="media" id="video" className="hidden" onClick={() => setIsMediaTypeImages(false)} />
                        <label htmlFor="video" className="flex flex-row items-center cursor-pointer">
                            <div
                                className={`p-1 pl-2 pr-3 ${
                                    !isMediaTypeImages
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "bg-stone-100 text-black hover:bg-stone-200 dark:bg-stone-950 dark:text-white dark:hover:bg-stone-800"
                                } rounded-r-md select-none border border-black dark:border-white`}
                            >
                                Vidéo
                            </div>
                        </label>
                    </div>
                </div>
                {isMediaTypeImages ? (
                    <div className="mb-4">
                        <label htmlFor="imagesInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                            Images
                        </label>
                        <input
                            type="file"
                            id="imagesInputPostCreationForm"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 cursor-pointer
                            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-1 file:border-solid file:border-black dark:file:border-white file:text-sm file:font-semibold file:bg-white dark:file:bg-black file:text-gray-700 hover:file:bg-stone-200
                            dark:file:text-gray-100 dark:hover:file:bg-stone-800 file:cursor-pointer"
                        />
                    </div>
                ) : (
                    <div className="mb-4">
                        <label htmlFor="videoInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                            Vidéo
                        </label>
                        <input
                            type="text"
                            id="videoInputPostCreationForm"
                            value={video}
                            onChange={handleVideoChange}
                            className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                            placeholder="Entrer l'URL de la vidéo"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm md:text-base font-bold md:font-medium mb-2" htmlFor="descriptionPostCreationForm">
                        Description
                    </label>
                    <textarea
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        id="descriptionPostCreationForm"
                        placeholder="Description de l'ɶuvre"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <label htmlFor="isArtToSellInputPostCreationForm" className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="select-none block text-sm md:text-base font-bold md:font-medium mb-2">Est-ce une ɶuvre à vendre ?</span>
                        </div>
                        <div className="relative cursor-pointer ">
                            <input type="checkbox" name="toSell" id="isArtToSellInputPostCreationForm" className="peer sr-only" checked={isArtToSell} onChange={() => setIsArtToSell(!isArtToSell)} />
                            <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        </div>
                    </div>
                </label>

                {isArtToSell && (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="priceInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                                Prix
                            </label>
                            <input
                                type="number"
                                id="priceInputPostCreationForm"
                                value={price}
                                onChange={(event) => setPrice(parseInt(event.target.value))}
                                className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                                placeholder="Entrer le prix de l'ɶuvre"
                                min={0}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="linkToBuyInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                                {"Lien pour acheter l'ɶuvre"}
                            </label>
                            <input
                                type="text"
                                id="linkToBuyInputPostCreationForm"
                                value={linkToBuy}
                                onChange={(event) => setLinkToBuy(event.target.value)}
                                className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                                placeholder="Entrer le lien pour acheter l'ɶuvre"
                            />
                        </div>
                    </div>
                )}

                <label htmlFor="canPeopleChatInputPostCreationForm" className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="select-none block text-sm md:text-base font-bold md:font-medium mb-2">Les gens peuvent-ils rentrer en contact avec vous ?</span>
                        </div>
                        <div className="relative cursor-pointer ">
                            <input
                                type="checkbox"
                                name="canChat"
                                id="canPeopleChatInputPostCreationForm"
                                className="peer sr-only"
                                checked={canPeopleChat}
                                onChange={() => setCanPeopleChat(!canPeopleChat)}
                            />
                            <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        </div>
                    </div>
                </label>

                <label htmlFor="addToUsersGalleryInputPostCreationForm" className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="select-none block text-sm md:text-base font-bold md:font-medium mb-2">Ajouter à ma gallerie ?</span>
                        </div>
                        <div className="relative cursor-pointer ">
                            <input
                                type="checkbox"
                                name="canChat"
                                id="addToUsersGalleryInputPostCreationForm"
                                className="peer sr-only"
                                checked={addedToGallery}
                                onChange={() => setAddedToGallery(!addedToGallery)}
                            />
                            <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        </div>
                    </div>
                </label>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        id="submitButtonPostCreationForm"
                        disabled={formSubmitted}
                        className="bg-black dark:bg-white border-2 rounded-md py-2 px-4 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                    >
                        {formSubmitted ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mx-[58px] my-[2px]" /> : "Créer la publication"}
                    </button>
                    {
                        //? Should we add a Preview before submitting the form?
                        ""
                        //TODO: Add other fields to the form depending on the selected category
                    }
                </div>
            </form>
        </div>
    );
}
