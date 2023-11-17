/*import React from "react";

interface ProfileProps {
    name: string;
    email: string;
    bio: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, bio }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{bio}</p>
        </div>
    );
};

export default Profile;
*/

import React from "react"
import {useState } from "react";
import {Description} from "../components/profile_des"
import {Liste} from "../components/profile_des"
import Post from "../components/post";
import {Friend} from "../components/profile_des"

export default function Profile(){
    const [clickedPost, setclickedPost] = useState(true);
    const [clickedLiked, setclickedLiked] = useState(false);
    const [clickedListe, setclickedListe] = useState(false);
    const [clickedTier, setclickedTier] = useState(false);
    const handleItemClickPost = () => {
        setclickedPost(true);
        setclickedLiked(false);
        setclickedListe(false);
        setclickedTier(false);

    };
    const handleItemClickLiked = () => {
        setclickedPost(false);
        setclickedLiked(true);
        setclickedListe(false);
        setclickedTier(false);
    };
    const handleItemClickListe = () => {
        setclickedPost(false);
        setclickedLiked(false);
        setclickedListe(true);
        setclickedTier(false);
    };
    const handleItemClickTier = () => {
        setclickedPost(false);
        setclickedLiked(false);
        setclickedListe(false);
        setclickedTier(true);
    };
    return (
        <div className="h-full w-full">
            <div className="max-w-[350px] mx-auto">
                <hr className="w-auto"></hr>
                <div className="inline-flex flex-row text-xl content-left">
                    <button className= {`p-1 rounded-lg ${clickedPost ? "bg-black dark:bg-white text-white dark:text-black " : "text-black dark:text-white hover:bg-gray-800"}`} onClick={handleItemClickPost} type="button"> 
                        <span className="m-3">Posts</span>
                    </button>
                    <button className={`p-1 rounded-lg ${clickedLiked ? "bg-black dark:bg-white text-white dark:text-black " : "text-black dark:text-white hover:bg-gray-800"}`} onClick={handleItemClickLiked} type="button"> 
                        <span className="m-2">J'aime</span>
                    </button>
                    <button className={`p-1 rounded-lg ${clickedListe ? "bg-black dark:bg-white text-white dark:text-black " : "text-black dark:text-white hover:bg-gray-800"}`} onClick={handleItemClickListe} type="button"> 
                        <span className="m-2">Listes</span>
                    </button>
                    <button className={`p-1 rounded-lg ${clickedTier ? "bg-black dark:bg-white text-white dark:text-black " : "text-black dark:text-white hover:bg-gray-800"}`} onClick={handleItemClickTier} type="button"> 
                        <span className="m-2">Tier Listes</span>
                    </button>
                </div>
            </div>
            <main className="flex w-full">
                <div className="h-full w-full flex flex-row">
                    {clickedPost ?
                        <div className = "max-w-[800px] mx-auto justify-right grow">
                            <Post title="Star Wars" description="Star Wars Prequels" mediaUrl="/Star-Wars-Prequels.jpg" />
                        </div>
                        : null
                    }
                    {clickedLiked ?
                        <div className = "max-w-[800px] justify-center mx-auto grow">
                            <Post title="Super Mario Film" description="Mario has to save Peach" mediaUrl="/mario-film.jpg" />
                        </div>
                        : null
                    }
                    {clickedListe ?
                        <div className = "max-w-[800px] justify-center mx-auto grow">
                            <Liste listeName="cinéma" picture="/pp-image-ex.jpg"/>
                        </div>
                        : null
                    }
                    {clickedTier ?
                        <div className = "max-w-[800px] justify-center mx-auto grow">
                            <Liste listeName="Tier Liste Jeux vidéo" picture="/pp-image-ex.jpg"/>
                        </div>
                        : null
                    }
                    <div className="justify-right min-w-[400px] flex flex-col">
                        <Description photoProfile="/pp-image-ex.jpg" userName="Michelle" description="Bonjour, je suis une artiste" preference="Musique" loisir="Sport" birthday="10/11/2001" account_birthday="17/11/2023" address="Paris"/>
                        <span className="pl-5 text-2xl font-semibold">Amis</span>
                        <div className="flex flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg darl:shadow-none m-5">
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Anna"/>
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Anna"/>
                            <Friend photoProfile="/pp-image-ex.jpg" userName="Anna"/>
                        </div>
                    </div>
                </div>

            </main>
        </div>

    );
}

