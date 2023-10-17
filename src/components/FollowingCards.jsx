'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AiTwotoneEye, AiTwotoneHeart, AiOutlineHeart } from 'react-icons/ai'
import { Bookmark } from "lucide-react";

export default function FollowingCards({ post }){
    const pathname = usePathname()
    // console.log(pathname);

    useEffect(() => {
      if(pathname === `/shots/${post.id}`){
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.body.style.overflow = 'auto'
      }
    })

    return (
        <>
          <div className="cards overflow-hidden flex flex-col relative xl:max-w-[316px] xl:max-h-[237px] xl:min-w-[30vh] xl:min-h-[18vw] sm:min-w-[280px] sm:min-h-[210px] min-h-[204px] rounded-lg">
            <Link href={`/shots/${post.id}`} className="relative group rounded-lg w-full h-full overflow-hidden">
            <Image 
            src={post.image}
            alt={post.authorName + '-' + 'post'}
            className='h-full w-full object-cover'
            fill
            />
            <div className="absolute px-4 z-10 flex items-center justify-between bottom-0 group-hover:bg-gradient-to-t duration-300 group-hover:from-black/60 group-hover:via-black/50 group-hover:opacity-100 opacity-0 group-hover:to-transparent w-full h-20">
                <p className="w-fit text-md text-white font-normal">{post.title.length > 18 ? post.title.slice(0, 18) + '...' : post.title}</p>
                <div className="flex h-full items-center gap-x-3 w-auto shrink-0">
                  <div className="h-10 w-10 rounded-full bg-white grid place-items-center hover:text-gray-500" title="Save shot"><Bookmark size={16} /></div>
                  <div className="h-10 w-10 rounded-full bg-white grid place-items-center hover:text-gray-500" title="Like this shot"><AiOutlineHeart size={16} /></div>
                </div>
            </div>
            </Link>
          {pathname !== `/following` ? null : (
            <div className="flex items-center justify-between mt-2 text-[0.85rem] leading-none">
            <div className="flex gap-x-2 items-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.authorImage} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <Link className="w-fit font-medium" href={`/` + post.authorName}><p>{post.authorName}</p></Link>
                <p className="bg-gray-600/40 font-semibold px-2 rounded-sm text-gray-100 py-0.5">Pro</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="flex items-center gap-x-1.5 text-gray-600 duration-300 cursor-pointer hover:text-red-500"><AiTwotoneHeart className="h-4 w-4" /> 10 </p>
              <p className="flex items-center gap-x-1.5 text-gray-600 duration-300 cursor-pointer hover:text-red-500"><AiTwotoneEye className="h-4 w-4" /> 10 </p>
            </div>
          </div>
          )}
          </div>

          </>
    )
}