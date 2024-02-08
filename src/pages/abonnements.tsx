import React, { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Friend } from "../components/profileDes";
import { UserContext } from "../components/userContext";
import E404 from "./404";
import { retrieveFollowedArtists } from "../utils/communityHandler";

const Abonnements: React.FC = () => {
    const { user, userNeeded, connected, logout } = useContext(UserContext);

    const [followedArtists, setFollowedArtists] = useState<any[] | undefined>(undefined);
    const breakpointColumnsObj = {
        default: 6,
        1100: 6,
        900: 3,
        500: 2,
        350: 1,
    };
    //! This is a function to retrieve the followed artists (id and photos)
    //const followedArtists = await retrieveFollowedArtists(user?._id || "");

    useEffect(() => {
        const fetchData = async () => {
            if (user?.username) {
                const artists = await retrieveFollowedArtists(user.username);
                if (artists !== undefined) {
                    console.log(artists);
                    setFollowedArtists(artists);
                    console.log(followedArtists);
                } else {
                    console.log("No artists found");
                }
            }
        };
        fetchData();
    }, [user?.username]);

    return connected ? (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold">Mes abonnements</h2>
            <div className="mx-auto w-full">
                <Masonry className="flex flex-wrap mt-4 mx-auto" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                    {followedArtists && followedArtists?.map((artist) => <Friend key={artist._id} photoProfile={artist.image} userName={artist.id} />)}
                </Masonry>
            </div>
        </div>
    ) : (
        <E404 />
    );
};
export default Abonnements;
