import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

export async function GET(req, { params }){
const { id } = params;

    const userPost = await prisma.post.findMany({
        where: {
            userId: id
        },
        take: 4,
    })

    return NextResponse.json(userPost, { status: 200 });
}