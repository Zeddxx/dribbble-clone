import OpenedPost from "@/components/OpenedPost";

export default function loading(){
    const isLoading = true;
    return(
        <div className="py-8">
         <OpenedPost isLoading={isLoading} />
        </div>
    )
}