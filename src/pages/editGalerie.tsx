import React, { useState } from "react";

const EditGalerie: React.FC = () => {
    const [galleryItems, setGalleryItems] = useState<string[]>([]);

    const handleAddItem = () => {
        // Add logic to add a new item to the galleryItems array
    };

    const handleChangeOrder = () => {
        // Add logic to change the order of items in the galleryItems array
    };

    // TODO: Redesign this page and backend to allow for editing of the gallery
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Galerie</h1>

            {/* Display gallery items */}
            <ul className="grid grid-cols-3 gap-4">
                {galleryItems.map((item, index) => (
                    <li key={index} className="bg-gray-200 p-4">
                        {item}
                    </li>
                ))}
            </ul>

            {/* Add item form */}
            <form className="mt-4">
                <input type="text" className="border border-gray-300 rounded px-4 py-2 mr-2" placeholder="Enter item name" />
                <button type="button" className=" rounded px-4 py-2" onClick={handleAddItem}>
                    Add Item
                </button>
            </form>

            {/* Change order buttons */}
            <div className="mt-4">
                <button type="button" className="rounded px-4 py-2 mr-2" onClick={handleChangeOrder}>
                    Change Order
                </button>
            </div>
        </div>
    );
};

export default EditGalerie;
