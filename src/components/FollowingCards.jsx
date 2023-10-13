'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function FollowingCards({ post }){
    const pathname = usePathname()
    console.log(pathname);

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
          <div className="cards group overflow-hidden flex flex-col cursor-pointer relative xl:max-w-[316px] xl:max-h-[237px] xl:min-w-[30vh] xl:min-h-[18vw] sm:min-w-[280px] sm:min-h-[210px] min-h-[204px] rounded-lg">
            <Link href={`/shots/${post.id}`} className="relative rounded-xl w-full h-full overflow-hidden">
            <Image 
            src={post.image}
            alt={post.authorName + '-' + 'post'}
            className='h-full w-full object-cover'
            fill
            />
            <div className="absolute px-4 z-10 flex items-center bottom-0 group-hover:bg-gradient-to-t duration-300 group-hover:from-black/60 group-hover:via-black/50 group-hover:opacity-100 opacity-0 group-hover:to-transparent w-full h-16">
                <p className="w-fit text-lg text-white font-medium">{post.title.length > 23 ? post.title.slice(0, 23) + '...' : post.title}</p>
            </div>
            </Link>
          {pathname !== `/following` ? null : (
            <div className="flex items-center mt-2 text-[0.85rem] leading-none">
            <div className="flex gap-x-1 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.authorImage} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <Link href={`/` + post.authorName}><p>{post.authorName}</p></Link>
            </div>
          </div>
          )}
          </div>

          </>
    )
}