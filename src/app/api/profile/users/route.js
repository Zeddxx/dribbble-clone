import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(request){
   const users = await prisma.user.findMany()

   return new Response(JSON.stringify(users))
}