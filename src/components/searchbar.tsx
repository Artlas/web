import { useState } from "react";
import { useRouter } from "next/router";
import { IoSearch, IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
    placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        const sanitizedTerm = /*sanitize*/ searchTerm;
        router.push(`/search?term=${sanitizedTerm}`);
    };

    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                placeholder={placeholder}
                className=" max-w-[115px] md:max-w-xs lg:max-w-none sm:text-sm md:text-base xl:text-xl px-4 py-2 border-2 bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 rounded-l-full focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="searchBar"
            />
            <button
                className="flex rounded-r-full px-4 py-2 md:px-6 lg:px-7 bg-black dark:bg-white border-2 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                type="submit"
                onClick={handleSearch}
                id="searchButton"
            >
                <IoSearchOutline className="w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7" />
                <span className="sr-only">Rechercher</span>
            </button>
        </div>
    );
}
