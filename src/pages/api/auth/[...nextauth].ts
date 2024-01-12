// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserInDatabase } from "../userAPI"

interface UserInfo {
    username: string;
    email: string;
    password?: string;
    fname?: string;
    lname?: string;
    image?: string;
    address?: string;
    birthdate?: string;
    permission?: string;
}
//const {ssoLogin} = useContext(UserContext);

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
            const userInfo: UserInfo = {
                username: profile.name,
                email: profile.email,
                fname: profile.given_name,
                lname: profile.family_name,
                image: profile.picture,
                address: profile.locale,
                permission: "user",
            };
            console.log(user)
            console.log(profile)
            console.log(account)
            //let user = checkUserInDatabase()
            // TODO
            // On dispose des infos de l'utilisateur
            // On check d'abord si l'utilisateur est présent dans la base de données connue avec ce gmail et identifiant
            // Si oui on le connecte et on get les infos save de base dans la bdd
            // Si non on le crée on get les infos save de base dans la bdd
            // Enfin on utilise ssoLogin pour mettre à jour le user context
            console.log(userInfo);

            return true; // If true connexion reussie
        },
    },
});
