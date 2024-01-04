// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Profile } from "next-auth";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
    throw new Error("Missing environment variables for Google authentication");
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId,
            clientSecret,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/userinfo.profile",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
            console.log("User Info:", user);
            console.log("Account Info:", account);
            console.log("Profile Info:", profile);
            const email = user.email;
            const name = user.name;
            const image = user.image;
            console.log(profile.given_name);

            // TODO
           
            /**
             *  Faire tourner en premier une fois pour avoir les infos puis attribuer chaque a info à user pour le user contexte
            *Penser au fait qu'il faut rendre le mot de passe facultatif pour la connexion concernant les requetes car pas besoin
            */

            /*console.log("Email "+ email)
            console.log("Name "+ name)
            //console.log("Image "+ image)
            console.log("User "+ user)*/

            return true; // If true connexion reussie
        },
    },
});
