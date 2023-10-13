import FilterMenu from "@/components/FilterMenu";
import Navbar from "@/components/Navbar";

export default function Home(){
  return(
    <>
    <Navbar />
      <div className="flex w-full px-6 lg:px-8 justify-between items-center">
        <FilterMenu />
      </div>
    </>
  )
}