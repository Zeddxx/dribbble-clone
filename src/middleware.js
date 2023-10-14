import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    const token = await getToken({ req })

    if(!token){
        return NextResponse.redirect(new URL('/sign-up', req.nextUrl))
    }
}

export const config = {
    matcher: ['/','/uploads/new']
}