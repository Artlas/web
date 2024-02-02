import React, { useState } from "react";
import { retrieveNumberOfListsSaved, createNewList } from "../api/actionUserAPI";
import { getRandomInt } from "../utils/tools";

const NewListForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");

    const handleImageChange = () => {};
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title != null && picture != null && description != null) {
            console.log(title, picture, description);
            try {
                let numberOfLists = (await retrieveNumberOfListsSaved()) ?? 0;
                let idNewList = numberOfLists !== null ? numberOfLists + 1 : getRandomInt();
                console.log("idNewList", idNewList);
                await createNewList(idNewList, title, picture, description);
            } catch (error) {
                console.log("Erreur lors de la création de la liste:", error);
            }
        }
        // Handle form submission here
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="container mx-auto shadow-md bg-stone-50 dark:bg-stone-900 p-4 rounded-xl">
                <div className="mb-4">
                    <label className="block text-sm md:text-base font-bold md:font-medium mb-2" htmlFor="title">
                        Titre
                    </label>
                    <input
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        id="title"
                        type="text"
                        placeholder="Titre de la liste"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageNewListForm" className="block text-sm md:text-base font-bold md:font-medium mb-2">
                        Illustration
                    </label>
                    <input
                        type="file"
                        id="imageNewListForm"
                        multiple={false}
                        required
                        accept="image/*"
                        onChange={handleImageChange}
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 cursor-pointer
                            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-1 file:border-solid file:border-black dark:file:border-white file:text-sm file:font-semibold file:bg-white dark:file:bg-black file:text-gray-700 hover:file:bg-stone-200
                            dark:file:text-gray-100 dark:hover:file:bg-stone-800 file:cursor-pointer"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm md:text-base font-bold md:font-medium mb-2" htmlFor="descriptionNewListForm">
                        Description
                    </label>
                    <textarea
                        className="shadow p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        id="descriptionNewListForm"
                        placeholder="Description de la liste"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-black dark:bg-white border-2 rounded-md py-2 px-4 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                        type="submit"
                        id="createListButton"
                    >
                        Créer la liste
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewListForm;
