'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Separator } from "./ui/separator";

const NavMenu = [
  {
    name: "Find talent",
    href: "/find",
  },
  {
    name: "Inspiration",
    href: "/inspiration",
  },
  {
    name: "Learn design",
    href: "/learn",
  },
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Go Pro",
    href: "/pro",
  },
];

let user = true;

export default function HamburgerBtn(){
    const [isToggle, setIsToggle] = useState(false)
    const divRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
          if(divRef.current && !divRef.current.contains(event.target)){
              setIsToggle(false);
          }
      };
      if(isToggle){
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = 'auto';
      }
  
      document.addEventListener('click', handleClickOutside)
  
      return () => {
          document.removeEventListener('click', handleClickOutside)
      }
    }, [isToggle])
    
    return(
      <>
      <div onClick={() => setIsToggle(!isToggle)} className="xmd:hidden flex flex-col justify-between h-4 w-6 cursor-pointer">
        <span className={`h-[2.5px] duration-300 w-full bg-black shrink-0 ${isToggle ? 'rotate-45 origin-center translate-y-[7px] ' : 'rotate-0 translate-y-0'}`}></span>
        <span className={`h-[2.5px] duration-300 w-full bg-black shrink-0 ${isToggle ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`h-[2.5px] duration-300 bg-black shrink-0 origin-center ${isToggle ? '-rotate-45 -translate-y-1.5': 'w-2/3 rotate-0 translate-y-0'}`}></span>
      </div>
      {isToggle && (
        <div className="fixed inset-0 w-full z-30 top-24 bg-black/60">
          <div ref={divRef} className="flex border-t text-[13.8px] p-6 font-medium text-black bg-white flex-col w-full gap-y-3 space-y-2 inset-x-0">
            {NavMenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:opacity-75 w-fit duration-200 antialiased"
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <>
              <Separator />
              <Link 
              href='/session/new'
              className="hover:opacity-75 w-fit duration-200 antialiased"
              >Log in</Link>
              </>
            )}
          </div>
        </div>
      )}
      </>
    )
}