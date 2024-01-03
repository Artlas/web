import React from "react";

interface ProfileProps {
    name: string;
    email: string;
    bio: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, bio }) => {
    return (
        <div id="profileMenu">
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{bio}</p>
        </div>
    );
};

export default Profile;
