import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail } from "lucide-react";
import demoAvatar from '../../public/dribbble-banner.webp'
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

export default function OpenedPost({ isLoading , posts }){
    
    return(
        <>
        <div className="flex w-full h-full flex-col gap-y-4 px-6">
                <div className="w-full h-auto max-w-3xl flex items-center justify-between mx-auto">
                    <div className="flex gap-x-4">
                        {isLoading ? (
                            <Skeleton className='h-12 w-12 rounded-full' />
                        ) : (
                            <Avatar className='h-12 w-12'>
                            <Link href={'/' + posts.authorName}>
                            <AvatarImage 
                            src={posts.authorImage}
                            />
                            </Link>
                            <AvatarFallback>{posts.authorName?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        )}
                    <div className="flex flex-col gap-y-1 justify-center">
                        {isLoading ? (
                            <>
                            <Skeleton className='h-8 w-64' />
                            <Skeleton className='h-6 w-44' />
                            </>
                        ) : (
                            <>
                            <h4 className="leading-none font-medium xmd:block hidden">{posts.title}</h4>
                        <p className="leading-none text-sm">{posts?.authorName}</p>
                            </>
                        )}
                    </div>
                    </div>
                    
                    {isLoading ? (
                        <Skeleton className='h-12 w-36' />
                    ) : (
                        <Button className={cn('rounded-full px-6')}>Work with us</Button>
                    )}
                </div>    

                <div className="max-w-5xl max-h-[768px] min-h-[363px] w-full xmd:w-[80vw] mx-auto h-[74vw] rounded-2xl relative overflow-hidden">
                    {isLoading ? (
                        <Skeleton className='h-full w-full' />
                    ) : (
                        <Image 
                    src={posts.image}
                    alt="Post image"
                    priority
                    fill
                    className="h-full w-full object-cover"
                    />
                    )}
                </div>

                <div className="max-w-3xl mx-auto w-full mt-4 h-auto">
                    {isLoading ? (
                        <Skeleton className='h-96 w-full' />
                    ) : (
                        <p className="leading-6 font-normal text-gray-700">{posts.description}</p>
                    )}
                </div>
            </div>    

            <div className="w-full flex items-center mt-8 max-w-6xl mx-auto gap-x-6">
                <span className="w-full h-[1px] rounded-full bg-gray-300 flex" />
                {isLoading ? (
                    <Skeleton className='h-24 w-24 rounded-full shrink-0' />
                ) : (
                    <Avatar className='h-24 w-24'>
                    <Link href={'/' + posts.authorName}>
                    <AvatarImage 
                    src={posts.authorImage}
                    />
                    </Link>
                    <AvatarFallback>
                        {posts.authorName?.slice(0,2)}
                    </AvatarFallback>
                </Avatar>
                )}
                <span className="w-full h-[1px] rounded-full bg-gray-300 flex" />
            </div>
            <div className="w-full h-auto flex flex-col items-center gap-y-1.5 mt-5">
                {isLoading ? (
                    <Skeleton className='h-8 w-36' />
                ) : (
                    <h5 className="text-2xl w-fit">{posts.authorName}</h5>
                )}
                <Button className={cn('rounded-full px-8 w-fit font-normal')}><Mail className="h-5 w-5 mr-2" /> Work with us</Button>
            </div>
        </>
    )
}