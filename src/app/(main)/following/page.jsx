import FollowingCards from "@/components/FollowingCards";
import prisma from '@/lib/prismadb'

export default async function Following() {

  const posts = await prisma.post.findMany()

  // console.log(posts);
  return (
      <div className="flex h-auto gap-8 md:gap-12 flex-wrap mb-8 px-4 sm:px-6 w-full justify-center mt-8">
        {posts.reverse().map((post) => (
          <FollowingCards post={post} key={post.id} />
        ))}
      </div>
  );
}
