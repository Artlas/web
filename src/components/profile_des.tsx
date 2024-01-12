import React from "react"
import Image from "next/image";
import Cake2LineIcon from "remixicon-react/Cake2LineIcon";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon"
import Home4LineIcon from "remixicon-react/Home4LineIcon"
import QuillPenLine from "remixicon-react/QuillPenLineIcon"
import HeartAddLine from "remixicon-react/HeartAddLineIcon"
interface ProfileProps {
    photoProfile: string;
    userName: string;
    description: string;
    preference: string;
    loisir: string;
    birthday: string;
    account_birthday: string;
    address : string;
}

interface FriendProps {
    photoProfile: string;
    userName: string;
}

interface ListeProps{
    listeName: string;
    picture: string;
}

export function Description({photoProfile, userName, description, preference, loisir, birthday, account_birthday, address}: ProfileProps){
    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none p-4 m-5 flex flex-col items-center">
            <div className="w-28 h-28 relative">
                <Image src={photoProfile} alt={userName} layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <span className="text-xl font-semibold m-2">{userName}</span>
            <span className="m-1">{description}</span>
            <div className="flex flex-row p-2">
                <QuillPenLine />
                <span>{loisir}</span>
            </div>
            <div className="flex flex-row p-2">
                <HeartAddLine />
                <span>{preference}</span>
            </div>
            <div className="flex flex-row p-2">
                <Cake2LineIcon />
                <span>{birthday}</span>
            </div>
            <div className="flex flex-row p-2">
                <Home4LineIcon />
                <span>{address}</span>
            </div>
            <div className="flex flex-row p-2">
                <CalendarLineIcon />
                <span>{account_birthday}</span>
            </div>
            

        </div>
    );
}

export function Liste({listeName, picture}:ListeProps){
    return(
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg darl:shadow-none p-4 m-5 flex flex-row">
            <div className="w-24 h-24 relative">
                <Image src={picture} alt={listeName} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>
            <div className="p-2">
                <h1>{listeName}</h1>
            </div>
        </div>
    );
}

export function Friend({photoProfile, userName}:FriendProps){
    return(
        <div className="p-4 m-2 flex flex-col items-center">
            <div className="w-24 h-24 relative">
                <Image src={photoProfile} alt={userName} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <span>{userName}</span>
        </div>
    );
}


