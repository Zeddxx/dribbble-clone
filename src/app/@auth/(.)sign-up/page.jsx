'use client'
 
import CloseModal from '@/components/CloseModal'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {

  const [isLoading, setIsLoading] = useState(false)
  const loginWithGoogle = async() => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
        <div className="container flex items-center h-full overflow-hidden max-w-lg justify-center mx-auto">
            <div className="relative h-fit bg-white w-fit py-2 px-2 rounded-lg">
                <div className="absolute top-4 right-4">
                    <CloseModal />
                </div>

                <div className="h-96 xmd:w-full max-w-[460px] w-full flex flex-col gap-y-8 justify-center px-8">
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
        </div>
    </div>
  )
}
