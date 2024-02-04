import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { UserContext } from "../../../components/userContext";
import Masonry from "react-masonry-css";
import { Oeuvre } from "@/types/oeuvre";
import DiscoverPost from "../../../components/discoverPost";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

// Define the type for the list data
type ListData = {
    _id: string;
    name: string;
    author: string;
    description: string;
    image: string;
    oeuvres: Oeuvre[];
};

// Define the props type for the component
type Props = {
    listData: ListData;
};

const Liste: React.FC<Props> = ({ listData }) => {
    const { user, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const [autoPlaying, setAutoPlaying] = useState(autoPlayDiaporamas || false);

    useEffect(() => {
        setAutoPlayDiaporamas(autoPlaying);
    }, [autoPlaying, setAutoPlayDiaporamas]);

    useEffect(() => {
        setAutoPlaying(autoPlayDiaporamas);
    }, [autoPlayDiaporamas]);

    const breakpointColumnsObj = {
        default: 3,
        3500: 6,
        3200: 5,
        2600: 4,
        1500: 3,
        1200: 2,
        500: 1,
    };

    const tempPost1: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        //  illustration: ["https://picsum.photos/450", "https://picsum.photos/1455", "https://picsum.photos/464/700", "https://picsum.photos/1450/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        likeCount: 0,
        author: "Jean-Michel",
    };
    const tempPost2: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        //  illustration: ["https://picsum.photos/650/1100", "https://picsum.photos/1455/500"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        likeCount: 0,
        author: "Jean-Michel",
    };
    const tempPost3: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        // illustration: ["https://picsum.photos/1600/900", "https://picsum.photos/1455/800", "https://picsum.photos/469/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        likeCount: 0,
        author: "Jean-Michel",
    };
    const tempPost4: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description:
            "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan. On essaye avec une deco un peu plus longue pour voir ce que ça donne avec un texte plus long, et beaucoup plus de mots, parce que là c'est vraiment pas assez long. Un peu de Wikipédia : La photographie de paysage est un genre de photographie dont l'objet est la prise de vue de paysage. Elle est, avec la photographie de famille et le portrait, un des genres de photographie artistique les plus pratiqués par les photographes amateurs. Il faut distinguer la photographie de paysages naturels de celle de paysages urbains.",
        category: "Photographie",
        subCategory: "Photos",
        // illustration: ["https://picsum.photos/1600/800"],
        postDate: new Date(),
        releaseDate: new Date(),
        likeCount: 0,
        author: "Jean-Michel",
        isMediaTypeImages: true,
    };
    const tempPost5: Oeuvre = {
        _id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        // illustration: ["https://picsum.photos/863/1000", "https://picsum.photos/1255/800", "https://picsum.photos/300/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
        likeCount: 0,
        author: "Jean-Michel",
    };

    return (
        <div id="discoverView">
            <div className="flex items-center mb-4 space-x-4">
                <Image src={listData ? listData.image : "https://picsum.photos/200/200"} alt="Liste image" width={200} height={200} className="rounded-xl" />
                <div>
                    <h2 className="text-2xl font-semibold">{listData ? listData.name : "LISTE NAME"}</h2>
                    <p>{listData ? listData.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna euismod."}</p>
                </div>
            </div>
            <div className="flex items-center">
                <span className="mr-2">{"Diaporama automatique :"}</span>
                <label className="flex items-center">
                    <div className="relative cursor-pointer">
                        <input type="checkbox" name="AutoPlay" id="AutoPlayDiaposSettingsToggle" className="peer sr-only" checked={autoPlaying} onChange={() => setAutoPlaying(!autoPlaying)} />
                        <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        <span className="sr-only">Toggle</span>
                    </div>
                </label>
            </div>
            <Masonry className="flex flex-wrap mt-4" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                <DiscoverPost {...tempPost2} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost3} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost4} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost5} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost2} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost3} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost4} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost5} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} scaleEffect={true} />
                <DiscoverPost {...tempPost2} autoPlaying={autoPlaying} scaleEffect={true} />
            </Masonry>
        </div>
    );
};

// TODO: define the getStaticPaths function
/*
// Define the getStaticPaths function
export const getStaticPaths: GetStaticPaths = async () => {
    //TODO: fetch the list IDs from the API
    // Fetch the list IDs from the API
    const listIds = await fetch("API_ENDPOINT_URL");
    const data = await listIds.json();

    // Generate the paths for each list ID
    const paths = data.map((listId: string) => ({
        params: { listId },
    }));

    return {
        paths,
        fallback: false,
    };
};

// Define the getStaticProps function
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    //TODO: fetch the list data from the API
    const { listId } = params || {};

    // Fetch the list data from the API using the listId
    const listData = await fetch(`API_ENDPOINT_URL/${listId}`);
    const data = await listData.json();

    return {
        props: {
            listData: data,
        },
    };
};
*/
export default Liste;
