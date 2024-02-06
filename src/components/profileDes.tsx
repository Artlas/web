import React from "react";
import Image from "next/image";
import CalendarLineIcon from "remixicon-react/CalendarLineIcon";
import QuillPenLine from "remixicon-react/QuillPenLineIcon";
import Link from "next/link";
interface ProfileProps {
    photoProfile: string;
    userName: string;
    preference: string;
    account_birthday: string;
    FollowButton?: React.ReactNode;
}

interface FriendProps {
    photoProfile: string;
    userName: string;
}

interface ListeProps {
    listeName: string;
    picture: string;
    author: string;
    listId: string;
}

export function Description({ photoProfile, userName, preference, account_birthday, FollowButton }: ProfileProps) {
    return (
        <div className="flex flex-col items-center bg-stone-100 dark:bg-stone-950 text-black dark:text-white border-2 border-solid  border-stone-200 dark:border-stone-800 py-4 rounded-lg xl:rounded-xl shadow-md dark:shadow-none lg:w-[400px] ">
            <div className="w-28 h-28 relative">
                <Image src={photoProfile} alt={userName} layout="fill" objectFit="cover" className="rounded-full shadow-lg" />
            </div>
            <span className="text-xl font-semibold m-2">{userName}</span>
            <div className="flex flex-row p-2 space-x-1">
                <QuillPenLine />
                <span>{preference}</span>
            </div>
            <div className="flex flex-row p-2 space-x-1">
                <CalendarLineIcon />
                <span>{account_birthday}</span>
            </div>
            <div className="flex flex-row p-2 space-x-1">{FollowButton}</div>
        </div>
    );
}

export function Liste({ listeName, picture, author, listId }: ListeProps) {
    return (
        <Link
            href={`/list/${author}/${listId}`}
            className="bg-stone-100 dark:bg-stone-950 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 text-black dark:text-white border-2 border-solid  border-stone-200 dark:border-stone-800 rounded-lg shadow-lg dark:shadow-none p-4 my-2 flex flex-row w-full container max-w-md lg:max-w-3xl lg:w-[280px] xl:w-[500px] 2xl:w-[700px] 3xl:w-[1000px] mx-auto"
        >
            <div className="w-24 h-24 relative">
                <Image src={picture} alt={listeName} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="p-2">
                <h1>{listeName}</h1>
            </div>
        </Link>
    );
}

export function Friend({ photoProfile, userName }: FriendProps) {
    return (
        <Link
            href={`/profile/${userName}`}
            className="py-2 px-4 m-2 max-w-[128px] max-h-[128px] flex flex-col items-center bg-stone-100 dark:bg-stone-950 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900  text-black dark:text-white border-2 border-solid  border-stone-200 dark:border-stone-800 rounded-lg xl:rounded-xl shadow-md dark:shadow-none"
        >
            <div className="w-24 h-24 ">
                <Image src={photoProfile} alt={userName} width={84} height={84} className="rounded-full mx-auto" />
            </div>
            <span>{userName.replaceAll("_", " ")}</span>
        </Link>
    );
}
