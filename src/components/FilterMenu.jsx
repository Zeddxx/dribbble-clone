"use client";

import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FilterMenu() {
  const pathname = usePathname()
  // console.log(pathname.split('/'));

  const pathnameParts = pathname.split('/')
  const lastPathname = pathnameParts[pathnameParts.length - 1]
  
  return (
    <>
      {pathname === '/' ? null : <DropdownMenu>
        <DropdownMenuTrigger 
        className={buttonVariants({ variant: 'outline', className :'flex gap-x-3 items-center'})}>
          {/* <Button 
          variant='outline' 
          className='flex gap-x-2 items-center rounded-xl capitalize'>{lastPathname} <ChevronDown size={17} /></Button> */}
          {lastPathname}  <ChevronDown size={17} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-52 ml-6 mt-3 rounded-2xl py-4 px-2 capitalize'>
          <DropdownMenuItem className={`w-full ${pathname === '/following' ? 'bg-gray-100' : 'bg-transparent'}`}>
            <Link href='/following' className={`w-full z-10`}>Following</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={`w-full ${pathname === '/shots/popular' ? 'bg-gray-100' : 'bg-transparent'}`}>
          <Link href='/shots/popular' className="w-full">Popular</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='w-full cursor-pointer'>New & Noteworthy</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
    </>
  );
}
