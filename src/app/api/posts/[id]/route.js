import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server';

export async function GET(request, { params }){
    const { id } = params;
    console.log(id);

    const post = await prisma.post.findUnique({
        where: {
            id: id,
        }
    })


    return NextResponse.json(post, { status: 200 })
}