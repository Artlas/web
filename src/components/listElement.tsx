import Link from "next/link";
import { ReactNode } from "react";

type ListElementProps = {
    icon: ReactNode;
    label: string;
    content: ReactNode;
    href?: string;
    hideBar?: boolean;
};

export default function ListElement({ icon, label, content, href, hideBar }: ListElementProps) {
    return href ? (
        <>
            <Link
                id={`listElementLink${label}`}
                href={href}
                className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2 text-base md:text-lg rounded-md cursor-pointer"
            >
                <div className="flex items-center">
                    {icon}
                    <span className="select-none">{label}</span>
                </div>
                {content}
            </Link>
            {!hideBar && <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />}
        </>
    ) : (
        <>
            <div className="flex items-center justify-between py-2 md:py-3 xl:py-4 hover:text-gray-800 hover:bg-gray-200 hover:dark:text-gray-200 hover:dark:bg-stone-800 active:bg-gray-300 active:dark:bg-stone-900 px-2 text-base md:text-lg rounded-md cursor-pointer">
                <div className="flex items-center overflow-hidden">
                    {icon}
                    <span className="select-none text-ellipsis">{label}</span>
                </div>
                {content}
            </div>
            {!hideBar && <hr className=" border-stone-300 dark:border-stone-700 w-[95%] mx-auto" />}
        </>
    );
}
