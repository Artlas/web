import React, { useState } from "react";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import DiscoverPost from "../components/discoverPost";

const Profile: React.FC = () => {
    const [autoPlaying, setAutoPlaying] = useState(true);

    const handleToggleAutoPlay = () => {
        setAutoPlaying(!autoPlaying);
    };

    const breakpointColumnsObj = {
        default: 3,
        3500: 6,
        3200: 5,
        2600: 4,
        1500: 3,
        1200: 2,
        500: 1,
    };

    const tempPost1 = {
        id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/450", "https://picsum.photos/1455", "https://picsum.photos/464/700", "https://picsum.photos/1450/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };
    const tempPost2 = {
        id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/650/1100", "https://picsum.photos/1455/500"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };
    const tempPost3 = {
        id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/1600/900", "https://picsum.photos/1455/800", "https://picsum.photos/469/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };
    const tempPost4 = {
        id: 1,
        title: "C'est très joli",
        description:
            "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan. On essaye avec une deco un peu plus longue pour voir ce que ça donne avec un texte plus long, et beaucoup plus de mots, parce que là c'est vraiment pas assez long. Un peu de Wikipédia : La photographie de paysage est un genre de photographie dont l'objet est la prise de vue de paysage. Elle est, avec la photographie de famille et le portrait, un des genres de photographie artistique les plus pratiqués par les photographes amateurs. Il faut distinguer la photographie de paysages naturels de celle de paysages urbains.",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/1600/800"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };
    const tempPost5 = {
        id: 1,
        title: "C'est très joli",
        description: "J'aime vraiment beaucoup trop ces photos, elles sont absolument magnifiques, je suis fan",
        category: "Photographie",
        subCategory: "Photos",
        illustration: ["https://picsum.photos/863/1000", "https://picsum.photos/1255/800", "https://picsum.photos/300/700"],
        postDate: new Date(),
        releaseDate: new Date(),
        isMediaTypeImages: true,
    };

    return (
        <div id="discoverView">
            <div className="flex items-center">
                <span className="mr-2">{"Lecture automatique des images des posts :"}</span>
                <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 " checked={autoPlaying} onChange={handleToggleAutoPlay} />
                    <span className="ml-2">{autoPlaying ? "Activé" : "Désactivé"}</span>
                </label>
            </div>
            <Masonry className="flex flex-wrap mt-4" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                <DiscoverPost {...tempPost2} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost3} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost4} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost5} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost2} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost3} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost4} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost5} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost1} autoPlaying={autoPlaying} />
                <DiscoverPost {...tempPost2} autoPlaying={autoPlaying} />
            </Masonry>
        </div>
    );
};

export default Profile;
