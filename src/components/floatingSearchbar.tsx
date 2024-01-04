import { useState } from "react";
import { useRouter } from "next/router";
import { IoSearch, IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
    placeholder: string;
}

//TODO: Sanitize search term
export default function FloatingSearchBar({ placeholder }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const sanitizedTerm = /*sanitize*/ searchTerm;
        router.push(`/search?term=${sanitizedTerm}`);
    };

    return (
        <div className="flex items-center justify-center p-1">
            <input
                type="text"
                placeholder={placeholder}
                className=" max-w-xs md:max-w-none text-xl px-4 py-2 border bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 rounded-l-full focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="searchBar"
                required
            />
            <button
                className="flex rounded-r-full py-2 px-6 md:px-7 bg-black dark:bg-white border-2 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                type="submit"
                onClick={handleSearch}
                id="searchButton"
            >
                <IoSearchOutline className="w-6 h-6 lg:w-7 lg:h-7" />
                <span className="sr-only">Rechercher</span>
            </button>
        </div>
    );
}
