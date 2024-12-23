import Navbar from "./shared/Navbar"
import {Avatar,AvatarImage} from "./ui/avatar"

const Profile = () => {
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8">
        <Avatar>
            <AvatarImage src=""/>
        </Avatar>
        </div>
    </div>
  )
}

export default Profile