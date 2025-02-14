import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminJobsTable = () => {
  const {allAdminJobs,searchJobByText} = useSelector(store=>store.job)
  const [filterJobs, setFilterJobs ] = useState(allAdminJobs);
  const navigate = useNavigate();


useEffect(()=>{
  const filteredJob = allAdminJobs.length >= 0  && allAdminJobs.filter((job)=>{
    if(!searchJobByText){
      return true;
    };
    return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
  });
  setFilterJobs(filteredJob);
},[allAdminJobs,searchJobByText])


  return (
    <div>
      {/* <Table>
        <TableCaption>A list of your recent jobs created </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job?._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{job?.applications.length}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={()=>navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=> navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table> */}
      <Table className="shadow-lg rounded-lg overflow-hidden">
  <TableCaption>A list of your recent jobs created</TableCaption>
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</TableHead>
      <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterJobs?.map((job, index) => (
      <TableRow key={job?._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job?.company?.name}</TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job?.title}</TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job?.createdAt.split("T")[0]}</TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job?.applications.length}</TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal className="w-4 h-4 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div onClick={() => navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                <Edit2 className="w-4" />
                <span>Edit</span>
              </div>
              <div onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                <Eye className="w-4" />
                <span>Applicants</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    </div>
  );
};

export default AdminJobsTable;