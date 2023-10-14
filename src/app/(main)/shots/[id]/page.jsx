'use client'

import OpenedPost from "@/components/OpenedPost";
import OpenedPostForMain from "@/components/OpenedPostForMain";
import { useEffect, useState } from "react";

export default function Page({ params }){
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOpenedPost = async () => {

            try {
                setIsLoading(true)
                const res =await fetch(`/api/posts/${params.id}`)
            const data = await res.json()
            setPosts(data)
            console.log(data);
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false)
            }
        }
    
        fetchOpenedPost()
    }, [params])
    return(
        <div className="max-w-6xl mx-auto h-auto mt-8">
           <OpenedPostForMain isLoading={isLoading} posts={ posts }/> 
        </div>
    )
}