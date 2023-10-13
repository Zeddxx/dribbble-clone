'use client'

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function UserAvatar({session}) {
  return (
    <div className="hidden lg:flex">
      <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        {/* <AvataModal userImage={userImage} userName={userName} /> */}
        {/* <div className='w-9 h-9 relative rounded-full overflow-hidden'>
          <Image
          src={userImage} 
          fill
          alt="user image"
          sizes="width: 36px; height: 36px"
          referrerPolicy="no-referrer"
          />
          <AvatarFallback>{userName.slice(0,2)}</AvatarFallback>
        </div> */}
        <Avatar className='w-9 h-9 relative rounded-full overflow-hidden'>
          <AvatarImage
          src={session?.user.image} 
          />
          <AvatarFallback className='uppercase'>{session?.user.name.slice(0,2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-80 mr-8 mt-2'>
        <DropdownMenuItem className='w-full cursor-pointer'>
          <Link href='/following'>Work preferences</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='w-full cursor-pointer'>
          <Link href={`/${session?.user.name}`}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        className='w-full cursor-pointer'>
          <button className="w-full h-auto text-start" onClick={() => signOut()}>Sign out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}
