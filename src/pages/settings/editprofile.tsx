import React from "react";
import E404 from "../404";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../components/userContext";

const EditProfile: React.FC = () => {
    const { user, userNeeded, connected, logout, acceptCookies, setAcceptCookies, autoPlayDiaporamas, setAutoPlayDiaporamas } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // TODO: Implement profile edit logic here
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
