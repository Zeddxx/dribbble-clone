import { getAuthSession } from '@/lib/authOptions';
import prisma from '@/lib/prismadb'

export async function POST( request ){

    const session = await getAuthSession()
    try {
        
        if(!session) {
            return new Response("you are not authenticated!", { status: 401 })
        }

        const body = await request.json()
        // console.log(body);
        const { title, description, image, authorName, authorImage, userId } = body

        if(!title || !description) {
            return new Response("Kindly Fill all the information!", { status: 500 })
        }

        const post = await prisma.post.create({
            data: {
                title: title,
                description: description,
                image: image,
                authorName: authorName,
                authorImage: authorImage,
                userId: userId,
            }
        })

        return new Response(post, { status : 200 })
    } catch (error) {
        return new Response("Error creating the Post :" ,error , { status: 405 })
    }
}