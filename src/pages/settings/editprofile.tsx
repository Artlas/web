import React from "react";
import E404 from "../404";
import { useState, useContext, useEffect } from "react";
import { UserContext, UserInfo } from "../../components/userContext";
import { validateLogin, checkParameters } from "@/src/utils/validators";
import { checkIfUserExists, updateUserInDatabase } from "../../api/userAPI";

const EditProfile: React.FC = () => {
    const { user, userNeeded, connected, logout, acceptCookies, setAcceptCookies, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");

    const updateUser = async (modifiedUser: UserInfo) => {
        try {
            await updateUserInDatabase(modifiedUser, user);
            console.log("User updated");
        } catch (error) {
            console.log("Error while updating user: ", error);
            throw error;
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        //
        if (username !== "" && email !== "") {
            console.log("Username:; ", username);
            console.log("Email: ", email);
            alert("Vous ne pouvez pas modifier votre email et nom d'utilisateur en même temps ");
            return;
        }
        /**
         *
         */
        let modifiedUser: UserInfo = {
            _id: user?._id ?? "",
            username: username !== "" ? username : user?.username ?? "",
            email: email !== "" ? email : user?.email ?? "",
            fname: firstName !== "" ? firstName : user?.fname ?? "",
            lname: lastName !== "" ? lastName : user?.lname ?? "",
            birthdate: birthDate !== "" ? new Date(birthDate) : user?.birthdate ?? new Date(),
            address: address !== "" ? address : user?.address ?? "",
            token: user?.token ?? "",
            permission: user?.permission ?? "",
        };

        if (email != null) {
            if (validateLogin(email)) {
                alert("Votre email saisie n'est pas valide, veuillez entrer une adresse email correcte");
                return;
            } else {
                var existsUserSameEmail;
                //TODO
                // FIXME: This is not working bcz we have 404 if user doesn't exitt
                if (email.length != 0 && username.length != 0) {
                    existsUserSameEmail = await checkIfUserExists(email, username);
                }
                console.log(modifiedUser.username);
                if (!existsUserSameEmail) updateUser(modifiedUser);
            }
        } else {
            if (username != null) {
                const existUserSameUsername = await checkIfUserExists(email, username);
                if (!existUserSameUsername) updateUser(modifiedUser);
            } else updateUser(modifiedUser);
        }
    };

    return connected ? (
        <div className="container xl:max-w-4xl mx-auto bg-stone-100 dark:bg-stone-950 text-black dark:text-white rounded-md border-2 border-solid  border-stone-200 dark:border-stone-800 py-4">
            <form className="p-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Modifier mes informations</h2>
                <div className="pb-4">
                    <label htmlFor="login" className="block font-medium">
                        Identifiant - actuel : {user?.username}
                    </label>
                    <input
                        id="usernameSignupInput"
                        type="text"
                        placeholder="Identifiant"
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="email" className="block font-medium">
                        Adresse email - actuel : {user?.email}
                    </label>
                    <input
                        id="emailSignupInput"
                        type="text"
                        placeholder="Adresse e-mail"
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="firstName" className="block font-medium">
                        Prénom - actuel : {user?.fname}
                    </label>
                    <input
                        id="firstNameSignupInput"
                        type="text"
                        placeholder="Prénom"
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="lastName" className="block font-medium">
                        Nom de famille - actuel : {user?.lname}
                    </label>
                    <input
                        id="lastNameSignupInput"
                        type="text"
                        placeholder="Nom de famille"
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="birthDate" className="block font-medium">
                        Date de naissance - actuel : {String(user?.birthdate)}
                    </label>
                    <input
                        id="birthDateSignupInput"
                        type="date"
                        placeholder="Date de naissance"
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <div className="pb-4">
                    <label htmlFor="address" className="block font-medium">
                        Adresse - actuel : {user?.address}
                    </label>
                    <input
                        id="addressSignupInput"
                        type="text"
                        placeholder="Adresse"
                        className="p-2 w-full rounded-md border bg-stone-100 dark:bg-stone-950 border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-0 focus:border-stone-500 dark:focus:border-stone-400 "
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="flex flex-col justify-between items-center">
                    <button
                        id="editProfileButton"
                        type="submit" //! Shoud be "submit" but causes a page reload
                        className="bg-black dark:bg-white border-2 rounded-md py-2 px-4 border-black dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-black focus:ring-opacity-50 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:focus:ring-stone-400 "
                    >
                        {"Modifier mes informations"}
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <E404 />
    );
};

export default EditProfile;
