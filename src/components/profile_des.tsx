import React from "react"
import Image from "next/image";

interface ProfileProps {
    photoProfile: string;
    userName: string;
    description: string;
}

export default function Description({photoProfile, userName, description}: ProfileProps){
    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none p-4 m-5 items-center">
            <div className="w-16 h-16 relative">
                <Image src={photoProfile} alt={userName} layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <p>{userName}</p>
            <p>{description}</p>
        </div>
    );
}