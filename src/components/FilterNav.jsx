'use client'

import { ListFilter, Palette, Search } from "lucide-react";
import FilterMenu from "./FilterMenu";
import { Button } from "./ui/Button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function FilterNav(){
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [tags, setTags] = useState('')
    const [color, setColor] = useState('')
    const pathname = usePathname()
    // console.log(pathname);

    return( 
        <>
        {pathname === '/shots/popular' || pathname === '/following' ? (
            <>
            <div className="w-full border-b pb-4 flex justify-between items-center">
            <FilterMenu />
            <Button 
            variant='outline' 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className='flex items-center antialiased text-sm font-light rounded-xl gap-x-2'>
                <ListFilter size={17} />
                Filters
            </Button>
        </div>
        <div className={`mt-4 w-full flex flex-col px-2 gap-x-4 lg:flex-row gap-y-4 duration-200 justify-center overflow-hidden ${isFilterOpen ? 'xmd:h-24 h-56' : 'h-0'}`}>
            <div className="relative w-full">
                <div className="flex justify-between items-center w-full">
                <Label htmlFor='tags'>Tags</Label>
                {tags.length > 0 && (
                    <p 
                    onClick={() => setTags('')}
                    className="text-[12px] text-gray-500 font-light cursor-pointer leading-none">Clear</p>
                )}
                </div>
                <div className="relative">
                <p className="absolute top-1/2 text-gray-400 -translate-y-1/2 left-3">
                    <Search size={18} strokeWidth={2.6} />
                </p>
                <Input 
                type='text' 
                id='tags'
                onChange={(e) => setTags(e.target.value)} 
                value={tags}
                className={cn('mt-3 h-12 pl-10 text-md')} 
                />
                </div>
            </div> 
          <div className="relative w-full">
          <div className="flex justify-between items-center w-full">
                <Label htmlFor='color'>Color</Label>
                {color.length > 0 && (
                    <p 
                    onClick={() => setColor('')}
                    className="text-[12px] text-gray-500 font-light cursor-pointer leading-none">Clear</p>
                )}
                </div>
                <div className="relative">
                <p className="absolute top-1/2 text-gray-400 -translate-y-1/2 left-3">
                    <Palette size={18} strokeWidth={2.6} />
                </p>
                <Input 
                type='text' 
                id='color'
                onChange={(e) => setColor(e.target.value)} 
                value={color}
                className={cn('mt-3 h-12 pl-10 text-md')} 
                />
                </div>
            </div>
        </div>
        </>
        ) : null}
        </>
    )
}