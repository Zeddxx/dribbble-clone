import NavLinks from "@/components/NavLinks";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import { getAuthSession } from "@/lib/authOptions";
import prisma from "@/lib/prismadb";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Profile | Dribbble",
  description: "Dribbble Profile",
};

export default async function RootLayout({ children, params }) {
  const { username } = params;

  var isLoading = true;
  let user;

  const session = await getAuthSession();
  const destructuredName = capitalizeUsername(username);

  try {
    isLoading = true
     user = await prisma.user.findFirst({
      where: {
        name: destructuredName,
      },
    });
    isLoading = false
  } catch (error) {
    console.error("Error getting user", error);
  }

  // console.log('user', user);
  return (
    <>
      <Navbar />
      {isLoading ? (
        // <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <div className="flex w-full justify-start md:justify-center mt-4 md:mt-0 h-[16rem] xmd:h-[18rem] px-4 sm:px-6">
          <div className="w-[30rem] h-full items-start md:items-center justify-start md:justify-center flex md:flex-row flex-col gap-x-8">
            <Skeleton className="h-20 w-20 md:h-32 rounded-full md:w-32 mb-7" />
            <div className="flex flex-col gap-y-2 md:gap-y-5">
              <Skeleton className="text-2xl md:text-4xl font-bold" />
              <Skeleton className='w-64 h-8'/>
              <div className="flex gap-x-4">
                <Skeleton
                  className="rounded-full h-8 w-20"
                />
                <Skeleton
                  className="rounded-full h-8 w-20"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Profile user={user} session={session} />
      )}
      <NavLinks />
      {children}
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
