import FilterNav from "@/components/FilterNav";
import Navbar from "@/components/Navbar";

// Use for SEO
export const metadata = {
  title: "Dribbble",
  description: "Created a Dribbble clone using nextjs 13.",
};

export default function RootLayout({ children }) {
  return (
    <main className="max-w-[93rem] mx-auto w-full">
      <Navbar />
      <div className="flex flex-col w-full h-auto px-4 md:px-12 justify-between items-center">
        <FilterNav />
      </div>
      {children}
    </main>
  );
}
