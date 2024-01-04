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
        async signIn({ user, account, profile }: { user: any; account: any; profile?: Profile }) {
            console.log("User Info:", user);
            console.log("Account Info:", account);
            console.log("Profile Info:", profile);
            const email = user.email;
            const name = user.name;
            const image = user.image;
            return true; // If true connexion reussie
        },
    },
});
