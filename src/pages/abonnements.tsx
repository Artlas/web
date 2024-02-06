import React, { useContext } from "react";
import Masonry from "react-masonry-css";
import { Friend } from "../components/profileDes";
import { UserContext } from "../components/userContext";
import E404 from "./404";

const Abonnements: React.FC = () => {
    const { user, userNeeded, connected, logout } = useContext(UserContext);
    const breakpointColumnsObj = {
        default: 6,
        1100: 6,
        900: 3,
        500: 2,
        350: 1,
    };
    //! This is a function to retrieve the followed artists (id and photos)
    //const followedArtists = await retrieveFollowedArtists(user?._id || "");
    /*
    useEffect(() => {
        const fetchData = async () => {
            if (user?.username) {
                //! This is a function to retrieve the followed artists (id and photos)
                const artists = await retrieveFollowedArtists(user.username);
                setFollowedArtists(artists);
            }
        };
        fetchData();
        console.log(followedArtists);
    }, [user?.username]);*/
    return connected ? (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold">Mes abonnements</h2>
            <div className="mx-auto w-full">
                <Masonry className="flex flex-wrap mt-4 mx-auto" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
                    <Friend photoProfile="https://picsum.photos/200" userName="Jean-Michel" />
                    <Friend photoProfile="https://picsum.photos/201" userName="Anna" />
                    <Friend photoProfile="https://picsum.photos/202" userName="Aurélien" />
                    <Friend photoProfile="https://picsum.photos/203" userName="Nicolas_UwU" />
                    <Friend photoProfile="https://picsum.photos/204" userName="Adrien" />
                    <Friend photoProfile="https://picsum.photos/205" userName="Gertrude" />
                    <Friend photoProfile="https://picsum.photos/206" userName="Tyril" />
                    <Friend photoProfile="https://picsum.photos/207" userName="Quentin" />
                </Masonry>
            </div>
        </div>
    ) : (
        <E404 />
    );
};
export default Abonnements;