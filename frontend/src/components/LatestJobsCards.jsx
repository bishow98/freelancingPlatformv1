import { Badge } from "@/components/ui/badge"


const LatestJobsCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
        <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">Nepal</p>
        </div>
        <div>
            <h2 className="font-bold text-lg my-2">Job Title</h2>
            <p className="text-sm text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold " variant="ghost">12 position</Badge>
            <Badge className="text-[#F83002] font-bold " variant="ghost">salary</Badge>
            <Badge className="text-[#7209b7] font-bold " variant="ghost">available</Badge>
        </div>
    </div>
  )
}

export default LatestJobsCards