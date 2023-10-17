'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import FollowingCards from "./FollowingCards";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenedPost({ isLoading , posts }){
    console.log(posts);
    const [userPosts, setUserPosts] = useState([])
    

    useEffect(() => {
        try {
            if(posts.userId){
                const fetchUserPosts = async () => {
                    const fetchedPost = await axios.get(`/api/posts/user-post/${posts.userId}`)
                    // console.log(userPosts);
                    setUserPosts(fetchedPost.data)
                }
        
                fetchUserPosts()

                document.title = posts.title
            }
        } catch (error) {
            console.log(error);
        }
    }, [posts])

    // console.log(userPosts);
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
                    <h5 className="text-2xl font-semibold w-fit">{posts.authorName}</h5>
                )}
                <Button className={cn('rounded-full px-8 w-fit font-normal mt-2')}><Mail className="h-5 w-5 mr-2" /> Work with us</Button>
            </div>

                    <div className="flex gap-8 md:gap-12 flex-wrap mb-8 px-4 sm:px-6 w-full justify-center mt-8">
                        {userPosts.map((post) => (
                            <FollowingCards key={post.id} post={post} />
                        ))}
                    </div>
        </>
    )
}