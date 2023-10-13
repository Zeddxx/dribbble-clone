import UploadNavbar from "@/components/UploadNavbar";
import { getAuthSession } from "@/lib/authOptions";

export default async function page(){

    const session = await getAuthSession()
    console.log(session);
    return(
        <div className="h-auto">
            <UploadNavbar session={session} />
        </div>
    )
}