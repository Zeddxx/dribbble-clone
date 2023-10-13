import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
// import { getAuthSession } from "@/lib/authOptions";

export default function Profile({ user, session }){

    // const { user } = await getAuthSession()
    console.log(user.image);
    return(
        <div className="flex w-full justify-start md:justify-center mt-4 md:mt-0 h-[16rem] xmd:h-[18rem] px-4 sm:px-6">
                <div className="w-[30rem] h-full items-start md:items-center justify-start md:justify-center flex md:flex-row flex-col gap-x-8">
                    <Avatar className='h-20 w-20 md:h-32 md:w-32 mb-7'>
                        <AvatarImage 
                        src={user?.image}
                        referrerPolicy='no-referrer'
                        />
                        <AvatarFallback className='uppercase'>{user?.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-y-2 md:gap-y-5">
                        <h1 className="text-2xl md:text-4xl font-bold">{user?.name}</h1>
                        <p>Cha</p>
                        <div className="flex gap-x-4">
                        {user?.id === session.user.id ? (
                            <>
                            <Button
                            variant='outline'
                            className='rounded-full h-11 px-6'
                            >Edit Profile</Button>
                                                    <Button 
                        variant='outline' 
                        className='rounded-full h-11 px-2'>
                            <MoreHorizontal className="h-6 w-6" />
                        </Button>
                            </>
                        ) : (
                            <>
                            <Button variant='outline' className={cn('rounded-full px-6')}>Follow</Button>
                            <Button variant='outline' className={cn('rounded-full px-6')}>Hire me</Button>
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
    )
}