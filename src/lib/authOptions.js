import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prismadb'
import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token , user, session}){
            // console.log("jwt callbacks: ", {token ,user, session});
            if(user){
                return{
                    ...token,
                    id: user.id,
                    username: user.name,
                }
            }

            return token;
        },
        async session({ token, user, session}){
            // console.log("session callbacks:", {token, user, session});
            return {
                ...session,
                user: {
                    ...session.user,
                    id:token.sub,
                    username: token.name,
                }
            }
            return session
        },
        redirect(){
            return '/'
        },
        async signIn({profile}){
            // console.log(profile);
            try {
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)