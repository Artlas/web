import React from "react"
import Image from "next/image";

interface ProfileProps {
    photoProfile: string;
    userName: string;
    description: string;
}

interface ListeProps{
    listeName: string;
    picture: string;
}

export function Description({photoProfile, userName, description}: ProfileProps){
    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none p-4 m-5 flex flex-col items-center">
            <div className="w-28 h-28 relative">
                <Image src={photoProfile} alt={userName} layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <span className="text-xl font-semibold m-2">{userName}</span>
            <span>{description}</span>
        </div>
    );
}

export function Liste({listeName, picture}:ListeProps){
    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg darl:shadow-none p-4 m-5 flex flex-row">
            <div className="w-24 w24 relative">
                <Image src={picture} alt={listeName} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>
            <div className="p-2">
                <h1>{listeName}</h1>
            </div>
        </div>
    );
}


