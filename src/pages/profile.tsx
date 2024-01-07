import React, { useContext } from "react";
import { UserContext } from "../components/userContext"; // Assurez-vous que le chemin d'import est correct

// Ajustez vos props si nécessaire
interface ProfileProps {
    bio: string;
}

const Profile: React.FC<ProfileProps> = ({ bio }) => {
    // Accédez au UserContext pour obtenir l'utilisateur actuel
    const { user } = useContext(UserContext);

    // Affichez le contenu conditionnellement, si un utilisateur est connecté
    return (
        <div id="profileMenu">
            {user ? (
                <>
                    <h1>{user.fname ?? user.username}</h1> {/* Utilisez fname s'il est disponible, sinon username */}
                    <p>{user.email}</p>
                    <p>{user.permission}</p>
                    <p>{user.address}</p>
                    <p>{user.birthdate}</p>
                    <p>{bio}</p>
                    {/* Ajoutez ici d'autres informations de profil si nécessaire */}
                </>
            ) : (
                <p>Aucun utilisateur connecté.</p>
            )}
        </div>
    );
};

export default Profile;
