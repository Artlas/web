import React from "react";
import E404 from "../404";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../components/userContext";
import { validatePassword, hashPasswordSha256 } from "@/src/utils/validators";
import { updatePasswordUser } from "../../api/userAPI";

const PasswordResetPage: React.FC = () => {
    const { user, userNeeded, connected, logout, acceptCookies, setAcceptCookies, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePreviousPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreviousPassword(event.target.value);
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newPassword != null) {
            console.log(user);
            if (!validatePassword(newPassword)) {
                alert("Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre");
                return;
            } else {
                const hashedPassword = hashPasswordSha256(newPassword);
                try {
                    await updatePasswordUser(hashPasswordSha256(previousPassword), hashedPassword, user);
                } catch (error) {
                    console.log("Error while updating password: ", error);
                    throw error;
                }
            }
        }
    };

    return connected ? (
        <div className="container xl:max-w-4xl mx-auto bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-md border-2 border-solid  border-stone-200 dark:border-stone-800 py-4">
            <form className="p-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Changer de mot de passe</h2>
                <div className="mb-4">
                    <label className="block font-medium" htmlFor="previousPassword">
                        Ancien mot de passe
                    </label>
                    <input
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        id="previousPassword"
                        type="password"
                        placeholder="Entrez votre ancien mot de passe"
                        value={previousPassword}
                        onChange={handlePreviousPasswordChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-medium" htmlFor="newPassword">
                        Nouveau mot de passe
                    </label>
                    <input
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        id="newPassword"
                        type="password"
                        placeholder="Entrez votre nouveau mot de passe"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                </div>
                <div className="flex flex-col justify-between items-center">
                    <button
                        className="bg-black dark:bg-white border-2 rounded-md py-2 px-4 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                        type="submit"
                        id="passwordResetButton"
                    >
                        Changer de mot de passe
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <E404 />
    );
};

export default PasswordResetPage;
