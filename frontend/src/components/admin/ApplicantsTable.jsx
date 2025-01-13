import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import axios from "axios"
import {toast} from "sonner"
import { APPLICATION_API_END_POINT } from "../utils/constants";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const shortListingStatus = ["Accepted", "Rejected"];
 
  //status update garna lai yo function use gareko : accepted, rejected ko lagi 
  const statusHandler = async (status,applicationId)=>{
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`,{status})

      console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
      }
      
    } catch (error) {
      toast.error(error.response.data.message)

      
      
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Applied freelancer</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.applicant?.profile?.resume}
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            onClick={()=> statusHandler(status,item._id)}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
