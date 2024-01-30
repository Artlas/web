import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { TbPhotoCircle } from "react-icons/tb";
import { NavigationCategory } from "@/types/category";

interface Props {
    navigationInfo: NavigationCategory[];
    reducedPanel: boolean;
}

export default function SideNavigation({ navigationInfo, reducedPanel }: Props) {
    const [categories, setCategories] = useState<NavigationCategory[]>([]);

    function handleCategory(name: string) {
        setCategories(categories.map((category) => (category.name === name ? { ...category, isShown: !category.isShown } : category)));
    }
    const routeName = useRouter().pathname.split("/")[1];
    const currentCategory = useRouter().query.category;
    const currentSubCategory = useRouter().query.subcategory;
    useEffect(() => {
        if (JSON.stringify(navigationInfo) !== JSON.stringify(categories)) {
            const updatedCategories = navigationInfo.map((category) => (category.name !== currentCategory ? { ...category, isShown: false } : category));
            setCategories(updatedCategories);
        }
    }, [navigationInfo, currentCategory]);

    return (
        <div className="flex flex-col w-full text-black dark:text-white mt-2 ">
            {reducedPanel ? (
                <div className="space-y-2">
                    <div>
                        <Link
                            href={"/monfeed"}
                            className={`flex flex-row justify-between items-center mx-4 rounded-full overflow-hidden border-2 ${
                                routeName === "monfeed"
                                    ? "bg-black dark:bg-white border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black"
                                    : "bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800"
                            } focus:rounded-full focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none`}
                            type="button"
                            id="monfeedNavigationLinkSmall"
                        >
                            <TbPhotoCircle className="text-4xl m-[1px]" />
                        </Link>
                    </div>
                    {categories.map((category) => {
                        return (
                            <div className="flex flex-col text-black dark:text-white" key={category.name + "Small" + category.id}>
                                <button
                                    onClick={() => handleCategory(category.name)}
                                    className={`flex flex-row justify-between items-center mx-4 rounded-full overflow-hidden border-2 ${
                                        category.isShown
                                            ? "bg-black dark:bg-white border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black"
                                            : "bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800"
                                    } focus:rounded-full focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none`}
                                    type="button"
                                    id={category.name + "CategoryNavigationButtonSmall" + category.id}
                                >
                                    <Image src={category.miniatureLink} alt={category.name} width={40} height={40} className="rounded-full" />
                                    <span className="sr-only">{category.name}</span>
                                </button>

                                {category.isShown ? (
                                    <div className="flex flex-col mx-6">
                                        {category.items.map((item) => {
                                            return (
                                                <Link
                                                    href={"/" + category.name + "/" + item}
                                                    className={`flex flex-row justify-between items-center rounded-full mb-1 mt-2 py-[5px]  ${
                                                        currentSubCategory === item ? "border border-black dark:border-white" : ""
                                                    }`}
                                                    key={category.name + item}
                                                    type="button"
                                                    id={category.name + item + "NavigationLinkSmall"}
                                                >
                                                    <Image src={`https://picsum.photos/4${category.id}`} alt={item} width={15} height={15} className="mx-auto rounded-full" />
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
                            id="monfeedNavigationLink"
                        >
                            <span className="md:text-xl">Mon Feed</span>
                        </Link>
                    </div>
                    {categories.map((category) => {
                        return (
                            <div className="flex flex-col text-black dark:text-white" key={category.name + category.id}>
                                <button
                                    onClick={() => handleCategory(category.name)}
                                    className={`flex flex-row justify-between items-center p-2 mx-4 rounded-lg border-2 ${
                                        category.isShown
                                            ? "bg-black dark:bg-white border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black"
                                            : "bg-stone-200 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-300 dark:hover:bg-stone-800"
                                    } focus:rounded-lg focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 focus:outline-none`}
                                    type="button"
                                    id={category.name + "CategoryNavigationButton" + category.id}
                                >
                                    <span className="md:text-xl">
                                        {category.name
                                            .split(" ")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")
                                            .replaceAll("_", " ")}
                                    </span>
                                    {category.isShown ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                </button>

                                {category.isShown ? (
                                    <div className="flex flex-col mx-6">
                                        {category.items.map((item) => {
                                            return (
                                                <Link
                                                    href={"/" + category.name + "/" + item}
                                                    className="flex flex-row justify-between items-center"
                                                    key={category.name + item}
                                                    type="button"
                                                    id={category.name + item + "NavigationLink"}
                                                >
                                                    <span
                                                        className={`${
                                                            currentSubCategory === item
                                                                ? (currentSubCategory === "all" && currentCategory === category.name) || currentSubCategory !== "all"
                                                                    ? "font-bold"
                                                                    : ""
                                                                : "hover:text-stone-800 dark:hover:text-stone-300 hover:font-bold"
                                                        } md:text-lg `}
                                                    >
                                                        {item === "all" ? "Tous" : item.charAt(0).toUpperCase() + item.slice(1).replaceAll("_", " ")}
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
