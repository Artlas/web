/*import React from "react";

interface ProfileProps {
    name: string;
    email: string;
    bio: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, bio }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{bio}</p>
        </div>
    );
};

export default Profile;
*/

import React from "react"
import Image from "next/image";
import Description from "../components/profile_des"

export default function Profile(){
    return (
        <div className="h-full w-full">
            <div className="inline-flex flex-row">
                <div className = "object-left-top">
                    <hr className="w-auto"></hr>
                    <div className="inline-flex flex-row text-xl">
                        <div className=" p-3 m-2 ">Posts</div>
                        <div className=" p-3 m-2 ">Evénements</div>
                        <div className=" p-3 m-2 ">J'aime</div>
                        <div className=" p-3 m-2 ">Listes</div>
                        <div className=" p-3 m-2 ">Tier Listes</div>
                    </div>   
                </div>
                <div className="object-right-top ">
                    <Description photoProfile="/pp-image-ex.jpg" userName="Michelle" description="Bonjour, je suis une artiste" />
                </div>
            </div>
        </div>

    );
}

