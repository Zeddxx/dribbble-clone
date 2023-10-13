"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function MobileAvatar() {

  const { data: session } = useSession()
  // console.log(session);

  const [isToggle, setIsToggle] = useState(false);
  const divRef = useRef(null)

  useEffect(() => {
    if(isToggle){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
    const handleClickOutside = (event) => {
        if(divRef.current && !divRef.current.contains(event.target)){
            setIsToggle(false);
        }
    };

    document.addEventListener('click', handleClickOutside)

    return () => {
        document.removeEventListener('click', handleClickOutside)
    }
  }, [isToggle])

  return (
    <div className="flex lg:hidden">
      <Avatar
        onClick={() => setIsToggle(!isToggle)}
        className="w-8 h-8 cursor-pointer"
      >
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>{session?.user.name.slice(0,2)}</AvatarFallback>
      </Avatar>
      {isToggle && (
        <div className="fixed top-[6.5rem] inset-0 bg-black/60 z-20">
          <div ref={divRef} className="border-t h-96 flex flex-col gap-y-4 py-8 px-8 absolute top-0 inset-0 bg-white justify-between">
            <Link href={`/${session?.user.name}`} className="flex w-full justify-center h-auto">
              <div 
              className="h-full flex cursor-pointer flex-col items-center justify-center text-center">
                <Avatar className="w-20 h-20 cursor-pointer">
                  <AvatarImage src={session?.user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="mt-3 text-slate-800 font-[500]">Sahil</p>

                <Link
                href='/uploads/new'
                  className={cn(buttonVariants({ variant: 'outline'}), 'rounded-full outline-1 outline mt-5 bg-gray-100 px-5 h-10')}
                >
                  Share work
                </Link>
              </div>
            </Link>

            <div className="flex w-full text-sm antialiased flex-col gap-y-5 py-3">
                <Link href='/following' className="hover:opacity-80">Work preferences</Link>
                <Link href='/account' className="hover:opacity-80">Settings</Link>

                <Separator className='' />

                <p 
                className="cursor-pointer hover:opacity-80"
                onClick={() => signOut()}
                >Sign out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
