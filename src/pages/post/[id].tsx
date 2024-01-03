import React from "react";

//TODO: WORL ON THIS PAGE
const PostPage: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-2xl font-bold">Post Title</h1>
            <div className="mt-2">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm text-gray-500 ml-2">Subcategory</span>
            </div>
            <div className="mt-4">{/* Carousel or Video Player component */}</div>
            <p className="mt-4">Post Description</p>
            <div className="mt-auto flex justify-end">
                <button className="mr-2">Like</button>
                <button className="mr-2">Add to List</button>
                <button>Share</button>
            </div>
        </div>
    );
};

export default PostPage;
