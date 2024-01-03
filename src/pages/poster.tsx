import React, { useState, useEffect } from "react";
// import axios from 'axios';

interface Props {
    category?: string;
    subcategory?: string;
}

const temporaryCategories = [
    {
        id: 1,
        name: "cinema",
        items: ["all", "films", "series", "courts-metrages"],
    },
    {
        id: 2,
        name: "musique",
        items: ["all", "musiques", "albums", "artistes"],
    },
    {
        id: 3,
        name: "arts plastiques",
        items: ["all", "peintures", "sculptures", "dessins", "gravures"],
    },
    {
        id: 4,
        name: "arts de la scene",
        items: ["all", "theatre", "danse", "opera", "cirque"],
    },
    {
        id: 5,
        name: "litterature",
        items: ["all", "livres", "romans", "poesie", "bandes dessinees", "mangas"],
    },
    {
        id: 6,
        name: "photographie",
        items: ["all", "photos", "photographes"],
    },
    {
        id: 7,
        name: "architecture",
        items: ["all", "batiments", "architectes", "monuments"],
    },
    {
        id: 8,
        name: "jeux video",
        items: ["all", "jeux", "developpeurs", "consoles", "steam", "pc"],
    },
    {
        id: 9,
        name: "cuisine",
        items: ["all", "française", "italienne", "japonaise", "chinoise", "indienne", "mexicaine", "espagnole", "americaine", "vegane", "vegetarienne"],
    },
];

export default function Poster({ category, subcategory }: Props) {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(category || "");
    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || "");
    const [date, setDate] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState("");
    const [isMediaTypeImages, setIsMediaTypeImages] = useState(true);

    //TODO: Fetch categories from API
    useEffect(() => {
        let categoriesNames: string[] = [];
        temporaryCategories.forEach((category) => {
            categoriesNames.push(category.name);
        });
        setCategories(categoriesNames);
    }, []);

    //TODO: Fetch subcategories from API
    useEffect(() => {
        let subcategoriesNames: string[] = [];
        temporaryCategories.forEach((category) => {
            if (category.name === selectedCategory) {
                category.items.forEach((subcategory) => {
                    subcategoriesNames.push(subcategory);
                });
            }
        });
        setSubCategories(subcategoriesNames);
    }, [selectedCategory]);

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

    const handleImageChange = () => {};

    const handleVideoChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setVideo(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // TODO: Submit the form data to the server
        // ...
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
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.replace(/^\w/, (c) => c.toUpperCase())}
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
                            {subCategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                    {subcategory.replace(/^\w/, (c) => c.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="dateInputPostCreationForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                        Date de sortie
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

                <div className="flex justify-center">
                    <button
                        type="submit"
                        id="submitButtonPostCreationForm"
                        className="bg-black dark:bg-white border-2 rounded-md py-2 px-4 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                    >
                        Créer la publication
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
