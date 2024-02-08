import React, { useState, useContext, useEffect } from "react";
import { getAllArt } from "../api/artAPI";
import { UserContext } from "../components/userContext";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import { Oeuvre } from "@/types/oeuvre";
import DiscoverPost from "../components/discoverPost";

const Profile: React.FC = () => {
    const { user, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const [autoPlaying, setAutoPlaying] = useState(autoPlayDiaporamas || false);
    const [posts, setPosts] = useState<Oeuvre[]>([]);

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

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllArt();
            let postsWithoutVideos: Oeuvre[] = [];
            data.forEach((post: Oeuvre) => {
                if (post.isMediaTypeImages) {
                    postsWithoutVideos.push(post);
                }
            });
            sortPostsByMostRecentPostDate(postsWithoutVideos);
            setPosts(postsWithoutVideos);
        };
        fetchData();
    }, []);

    function sortPostsByMostRecentPostDate(posts: Oeuvre[]) {
        if (posts.length > 0) {
            return posts.sort((a, b) => {
                if (typeof a.postDate === "string") {
                    a.postDate = new Date(a.postDate);
                }
                if (typeof b.postDate === "string") {
                    b.postDate = new Date(b.postDate);
                }
                return b.postDate.getTime() - a.postDate.getTime();
            });
        }
    }

    return (
        <div id="discoverView">
            <div className="flex items-center">
                <span className="mr-2">{"Lecture automatique des images des posts :"}</span>
                <label className="flex items-center">
                    <div className="relative cursor-pointer">
                        <input type="checkbox" name="AutoPlay" id="AutoPlayDiaposSettingsToggle" className="peer sr-only" checked={autoPlaying} onChange={() => setAutoPlaying(!autoPlaying)} />
                        <div className="peer h-5 w-9 rounded-full bg-gray-400 dark:bg-stone-600 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 dark:after:border-stone-600 after:bg-white dark:after:bg-black after:transition-all after:content-[''] peer-checked:bg-black dark:peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#AAAAAA88]"></div>
                        <span className="sr-only">Toggle</span>
                    </div>
                </label>
            </div>
            <Masonry className="flex flex-wrap mt-4" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                {posts && posts.length > 0 && posts.map((post) => <DiscoverPost key={post._id} {...post} autoPlaying={autoPlaying} scaleEffect={true} />)}
                {posts && posts.length > 0 && posts.map((post) => <DiscoverPost key={post._id} {...post} autoPlaying={autoPlaying} scaleEffect={true} />)}
                {posts && posts.length > 0 && posts.map((post) => <DiscoverPost key={post._id} {...post} autoPlaying={autoPlaying} scaleEffect={true} />)}
            </Masonry>
        </div>
    );
};

export default Profile;
