import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

interface Props {
    navigationInfo: {
        categories: {
            name: string;
            items: string[];
            isShown: boolean;
        }[];
    };
    reducedPanel: boolean;
}

export default function SideNavigation({ navigationInfo, reducedPanel }: Props) {
    const [categories, setCategories] = useState(navigationInfo.categories);

    function handleCategory(name: string) {
        setCategories(categories.map((category) => (category.name === name ? { ...category, isShown: !category.isShown } : category)));
    }
    const routeName = useRouter().pathname.split("/")[1];
    const currentCategory = useRouter().query.category;
    const currentSubCategory = useRouter().query.subcategory;

    useEffect(() => {
        setCategories(categories.map((category) => (category.name !== currentCategory ? { ...category, isShown: false } : category)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigationInfo, currentCategory]);

    return (
        <div className="flex flex-col w-full text-black dark:text-white mt-2 ">
            {reducedPanel ? (
                <></>
            ) : (
                <div className="space-y-2 ">
                    <div>
                        <Link
                            href={"/monfeed"}
                            className={`flex flex-row justify-between items-center p-2 mx-4 rounded-lg ${
                                routeName === "monfeed"
                                    ? "bg-black dark:bg-white border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black"
                                    : "bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800"
                            } border-2 focus:rounded-lg focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none`}
                            type="button"
                        >
                            <span className="md:text-xl">Mon Feed</span>
                        </Link>
                    </div>
                    {categories.map((category) => {
                        return (
                            <div className="flex flex-col text-black dark:text-white" key={category.name}>
                                <button
                                    onClick={() => handleCategory(category.name)}
                                    className={`flex flex-row justify-between items-center p-2 mx-4 rounded-lg border-2 ${
                                        category.isShown
                                            ? "bg-black dark:bg-white border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black"
                                            : "bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800"
                                    } focus:rounded-lg focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none`}
                                    type="button"
                                >
                                    <span className="md:text-xl">
                                        {category.name
                                            .split(" ")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </span>
                                    {category.isShown ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                </button>

                                {category.isShown ? (
                                    <div className="flex flex-col mx-6">
                                        {category.items.map((item) => {
                                            return (
                                                <Link href={"/" + category.name + "/" + item} className="flex flex-row justify-between items-center" key={category.name + item} type="button">
                                                    <span
                                                        className={`${
                                                            currentSubCategory === item
                                                                ? (currentSubCategory === "all" && currentCategory === category.name) || currentSubCategory !== "all"
                                                                    ? "font-bold"
                                                                    : ""
                                                                : "hover:text-stone-800 dark:hover:text-stone-300 hover:font-bold"
                                                        } md:text-lg `}
                                                    >
                                                        {item === "all" ? "Tous" : item.charAt(0).toUpperCase() + item.slice(1)}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
