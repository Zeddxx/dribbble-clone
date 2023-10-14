import Back from "@/components/Back";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OpenedPost from "@/components/OpenedPost";
import prisma from '@/lib/prismadb'

export default async function Page({ params }){

    const { id } = params;

    const openedPost = await prisma.post.findFirst({
        where: {
            id: id,
        }
    })

    return(
        <div className="fixed h-full w-full bg-black/70 z-20 top-0 inset-x-0">
            <Back />
            <div className="h-auto absolute xmd:top-8 block top-0 rounded-t-xl rounder-r-xl w-full max-h-full bg-white z-30 xmd:py-16 py-8 overflow-y-auto">
                <Back />
                <div className="max-w-3xl px-6 mb-1.5 mx-auto flex w-full">
                <p className="text-4xl w-fit block xmd:hidden font-bold">{openedPost.title}</p>
                </div>
                    <OpenedPost posts={openedPost}/>
                <div className="h-full w-fit xmd:flex hidden flex-col gap-y-4  absolute right-8 top-20">
            <div className="h-auto sticky top-0">
            <Avatar className='h-10 w-10'>
                <AvatarImage src={openedPost.authorImage} />
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            </div>
        </div>
            </div>
        </div>
    )
}