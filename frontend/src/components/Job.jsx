import {Badge} from "./ui/badge"
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://picsum.photos/200/300" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">Nepal</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut delectus libero soluta necessitatibus eveniet dolorum totam similique inventore deserunt?</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">12Position</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">part time</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24 lpa</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button calssName="bg-[#7209b7]" >Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
