// 'use client'

export default function VideoPlayer(){
    
    return(
        <video 
        className="h-full w-full object-cover"
        src='https://cdn.dribbble.com/uploads/48292/original/30fd1f7b63806eff4db0d4276eb1ac45.mp4?1689187515'
        loop 
        muted
        autoPlay
        />
    )
}