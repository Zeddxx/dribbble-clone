'use client'

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back(){
    const router = useRouter()
    return(
        <>
        <div onClick={() => router.back()} className="absolute w-fit top-[6.3px] xmd:block hidden right-6 text-white">
                <X className="h-6 w-6" />
            </div>
        <div onClick={() => router.back()} className="w-full xmd:hidden flex px-6 mb-4 justify-end items-center">
                    <X className="h-6 w-6" />
        </div>
        </>
    )
}