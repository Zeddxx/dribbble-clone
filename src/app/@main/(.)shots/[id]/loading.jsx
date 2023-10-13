import OpenedPost from "@/components/OpenedPost";

export default function loading(){
    const isLoading = true;
    return(
        <>
         <OpenedPost isLoading={isLoading} />
        </>
    )
}