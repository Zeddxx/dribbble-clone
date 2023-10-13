'use client'

import Link from "next/link";
import { Button } from "./ui/Button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { Icons } from "./Icons";
import { useToast } from "./ui/use-toast";

export default function SignupModal() {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const loginWithGoogle = async() => {
      setIsLoading(true)

      try {
        await signIn('google') 
      } catch (error) {
        // console.log(error);
        toast({
          title: 'There was an problem signing up',
          description: 'There was an error occurred while signing you up!',
          variant: 'destructive'
        })

      }finally{
        setIsLoading(false)
        toast({
          title: 'User signed in successfully!',
          variant: 'success'
        })
      }
    }
  return (
    <div className="flex w-[450px] h-[500px] justify-center xmd:justify-start items-center">
      <div className="h-full xmd:w-full xmd:ml-28 max-w-[460px] w-full flex flex-col gap-y-8 justify-center px-8">
        <h1 className="text-2xl font-bold">Sign up to Dribbble</h1>
        <div
          className="
              flex
              flex-col
              gap-y-4
              w-full
              "
        >
          <Button
          isLoading={isLoading}
          onClick={loginWithGoogle}
          className="
                  font-medium
                  rounded-full
                  h-14
                  hover:bg-slate-600
                  "
          >
            {isLoading ? null : <Icons.google className='h-5 w-5 mr-3' />}
            Sign up with Google
          </Button>
          {/* <div className="flex items-center w-full gap-x-2 px-2 mt-3">
            <Separator className="w-44" />
            <p className="opacity-60 font-light text-sm">or</p>
            <Separator className="w-44" />
          </div> */}
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="text-[12px] text-center font-light">By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.</p>
        </div>
        <p className="text-center text-sm font-light antialiased">Already have an account? <Link href='/session/new' className="underline">Sign In</Link> </p>
      </div>
    </div>
  );
}
