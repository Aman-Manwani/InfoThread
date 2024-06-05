import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from "next/navigation";

const page = async({params} : {params: {id:string}}) => {

    const user = await currentUser();

    if(!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id);

    if(!userInfo.onboarded) {
        redirect('/onboarding');
    }

  return (
    <section>
      <ProfileHeader 
        accountId = {userInfo.id}
        authUserId = {user.id}
        name = {userInfo.name}
        username = {userInfo.username}
        imgUrl = {userInfo.image}
        bio = {userInfo.bio}
      />
      <div className="mt-9">
        <Tabs></Tabs>
      </div>
    </section>
  )
}

export default page
