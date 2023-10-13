import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import prisma from "@/lib/prismadb";
import FollowingCards from "@/components/FollowingCards";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { username } = params;
  const fullName = capitalizeUsername(username);

  const profile = await prisma.user.findFirst({
    where: {
      name: fullName,
    },
  });
  
  if(!profile){
    return notFound()
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: profile.id,
    },
  });
  return (
    <>
      {posts.length >= 0 ? (
        <div className="flex gap-8 md:gap-12 flex-wrap mb-8 px-4 sm:px-6 w-full justify-center mt-8">
          {posts.reverse().map((post) => (
            <FollowingCards key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex gap-16 flex-wrap mb-8 px-4 sm:px-8 w-full justify-center mt-8">
          <div className="cards p-4 gap-y-4 border-dashed flex flex-col items-center justify-center text-center border-gray-200 border-2 outline-1 sm:min-w-[280px] sm:min-h-[210px] min-h-[330px] rounded-lg">
            <h1 className="text-2xl font-bold">Upload your first shot</h1>
            <p>
              Show off your best work. Get feedback, likes and be a part of a
              growing community.
            </p>
            <Link
              href="/uploads/new"
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full"
              )}
            >
              Upload your first shot
            </Link>
          </div>
          <div className="cards sm:min-w-[280px] sm:min-h-[210px] min-h-[330px] rounded-lg bg-gradient-to-b from-gray-200 to-transparent"></div>
          <div className="cards sm:min-w-[280px] sm:min-h-[210px] min-h-[330px] rounded-lg bg-gradient-to-b from-gray-200 to-transparent"></div>
          <div className="cards sm:min-w-[280px] sm:min-h-[210px] min-h-[330px] rounded-lg bg-gradient-to-b from-gray-200 to-transparent"></div>
          <div className="cards sm:min-w-[280px] sm:min-h-[210px] min-h-[330px] rounded-lg bg-gradient-to-b from-gray-200 to-transparent"></div>
        </div>
      )}
    </>
  );
}

function capitalizeUsername(username) {
  // Split the username into parts, capitalize each part, and rejoin them
  const parts = username.split("%20");
  const capitalizedParts = parts.map((part) => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  return capitalizedParts.join(" ");
}
