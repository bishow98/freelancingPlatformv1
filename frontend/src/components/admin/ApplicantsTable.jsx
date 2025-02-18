

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "../utils/constants";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { updateApplicationStatus } from "../../redux/applicationSlice";


const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const shortListingStatus = ["Accepted", "Rejected"];
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const handleStatusClick = (status, applicationId) => {
    setSelectedStatus(status);
    setSelectedApplicationId(applicationId);
    setIsAlertOpen(true);
  };

  const statusHandler = async (status, applicationId) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status }
      );

      if (res.data.success) {
        // Dispatch the update to Redux store
        dispatch(updateApplicationStatus({ 
          applicationId: applicationId, 
          status: status.toLowerCase() 
        }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleConfirm = async () => {
    await statusHandler(selectedStatus, selectedApplicationId);
    setIsAlertOpen(false);
  };

  return (
    <div>
      <Table className="shadow-lg rounded-lg overflow-hidden">
        <TableCaption>A list of your recent Applied freelancer</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              FullName
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resume
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, index) => (
              <TableRow
                key={item._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500 cursor-pointer hover:underline"
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
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge
                    className={`${
                      item?.status === "rejected"
                        ? "bg-red-500"
                        : item?.status === "pending"
                        ? "bg-gray-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item?.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => handleStatusClick(status, item._id)}
                          className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to {selectedStatus?.toLowerCase()} this job application?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApplicantsTable;


// import { MoreHorizontal, Star } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { APPLICATION_API_END_POINT } from "../utils/constants";
// import { Badge } from "../ui/badge";
// import { useState } from "react";

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);
//   const shortListingStatus = ["Accepted", "Rejected", "Rate"];
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [isRatingOpen, setIsRatingOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [selectedApplicationId, setSelectedApplicationId] = useState(null);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [ratings, setRatings] = useState({});

//   const handleStatusClick = (status, applicationId) => {
//     if (status === "Rate") {
//       setSelectedApplicationId(applicationId);
//       setIsRatingOpen(true);
//     } else {
//       setSelectedStatus(status);
//       setSelectedApplicationId(applicationId);
//       setIsAlertOpen(true);
//     }
//   };

//   const statusHandler = async (status, applicationId) => {
//     try {
//       axios.defaults.withCredentials = true;
//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
//         { status }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const handleConfirm = async () => {
//     await statusHandler(selectedStatus, selectedApplicationId);
//     setIsAlertOpen(false);
//   };

//   const handleRatingConfirm = () => {
//     setRatings({
//       ...ratings,
//       [selectedApplicationId]: selectedRating
//     });
//     setIsRatingOpen(false);
//     setSelectedRating(0);
//     toast.success("Rating submitted successfully!");
//   };

//   // const StarRating = () => {
//   //   return (
//   //     <div className="flex gap-1">
//   //       {[1, 2, 3, 4, 5].map((rating) => (
//   //         <Star
//   //           key={rating}
//   //           className={`w-6 h-6 cursor-pointer ${
//   //             rating <= (hoveredRating || selectedRating)
//   //               ? "fill-yellow-400 text-yellow-400"
//   //               : "text-gray-300"
//   //           }`}
//   //           onMouseEnter={() => setHoveredRating(rating)}
//   //           onMouseLeave={() => setHoveredRating(0)}
//   //           onClick={() => setSelectedRating(rating)}
//   //         />
//   //       ))}
//   //     </div>
//   //   );
//   // };

//   const StarRating = () => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((rating) => (
//           <Star
//             key={rating}
//             className={`w-6 h-6 cursor-pointer transition-colors ${
//               rating <= (hoveredRating || selectedRating)
//                 ? "fill-yellow-400 text-yellow-400"
//                 : "fill-none text-gray-300"
//             }`}
//             onMouseEnter={() => setHoveredRating(rating)}
//             onMouseLeave={() => setHoveredRating(0)}
//             onClick={() => {
//               setSelectedRating(rating);
//               setHoveredRating(0);
//             }}
//           />
//         ))}
//         <span className="ml-2 text-sm font-medium">
//           {selectedRating > 0 && `Selected Rating: ${selectedRating}`}
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Table className="shadow-lg rounded-lg overflow-hidden">
//         <TableCaption>A list of your recent Applied freelancer</TableCaption>
//         <TableHeader className="bg-gray-100">
//           <TableRow>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               FullName
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Email
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Contact
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Resume
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Date
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Status
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Ratings
//             </TableHead>
//             <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Action
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applicants &&
//             applicants?.applications?.map((item, index) => (
//               <TableRow
//                 key={item._id}
//                 className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//               >
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {item?.applicant?.fullname}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.email}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.phoneNumber}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.profile?.resume ? (
//                     <a
//                       className="text-blue-500 cursor-pointer hover:underline"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       href={item?.applicant?.profile?.resume}
//                     >
//                       {item?.applicant?.profile?.resumeOriginalName}
//                     </a>
//                   ) : (
//                     <span>NA</span>
//                   )}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.createdAt.split("T")[0]}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <Badge
//                     className={`${
//                       item?.status === "rejected"
//                         ? "bg-red-500"
//                         : item?.status === "pending"
//                         ? "bg-gray-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     {item?.status.toUpperCase()}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {ratings[item._id] || 0}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal className="w-4 h-4 cursor-pointer" />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       {shortListingStatus.map((status, index) => (
//                         <div
//                           key={index}
//                           onClick={() => handleStatusClick(status, item._id)}
//                           className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
//                         >
//                           <span>{status}</span>
//                         </div>
//                       ))}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>

//       {/* Status Update Alert Dialog */}
//       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
//             <AlertDialogDescription>
//               Do you want to {selectedStatus?.toLowerCase()} this job application?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleConfirm}>
//               Confirm
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Rating Alert Dialog */}
//       <AlertDialog open={isRatingOpen} onOpenChange={setIsRatingOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Rate the Freelancer</AlertDialogTitle>
//             <AlertDialogDescription className="flex flex-col items-center gap-4">
//               <StarRating />
//               <span className="text-sm font-medium">
//                 Selected Rating: {selectedRating}
//               </span>
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => {
//               setSelectedRating(0);
//               setHoveredRating(0);
//             }}>
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction onClick={handleRatingConfirm}>
//               Confirm
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default ApplicantsTable;


// import { MoreHorizontal, Star } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { APPLICATION_API_END_POINT } from "../utils/constants";
// import { Badge } from "../ui/badge";
// import { useState } from "react";

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);
//   const shortListingStatus = ["Accepted", "Rejected", "Rate"];
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [isRatingOpen, setIsRatingOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [selectedApplicationId, setSelectedApplicationId] = useState(null);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [ratings, setRatings] = useState({});

//   const handleStatusClick = (status, applicationId) => {
//     if (status === "Rate") {
//       setSelectedApplicationId(applicationId);
//       setIsRatingOpen(true);
//     } else {
//       setSelectedStatus(status);
//       setSelectedApplicationId(applicationId);
//       setIsAlertOpen(true);
//     }
//   };

//   const statusHandler = async (status, applicationId) => {
//     try {
//       axios.defaults.withCredentials = true;
//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
//         { status }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const handleConfirm = async () => {
//     await statusHandler(selectedStatus, selectedApplicationId);
//     setIsAlertOpen(false);
//   };

//   const handleRatingConfirm = () => {
//     // Update the ratings state
//     const updatedRatings = {
//       ...ratings,
//       [selectedApplicationId]: selectedRating,
//     };
//     setRatings(updatedRatings);

//     // Close the rating dialog
//     setIsRatingOpen(false);
//     setSelectedRating(0);
//     setHoveredRating(0);

//     toast.success("Rating submitted successfully!");
//   };

//   const StarRating = () => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((rating) => (
//           <Star
//             key={rating}
//             className={`w-6 h-6 cursor-pointer transition-colors ${
//               rating <= (hoveredRating || selectedRating)
//                 ? "fill-yellow-400 text-yellow-400"
//                 : "fill-none text-gray-300"
//             }`}
//             onMouseEnter={() => setHoveredRating(rating)}
//             onMouseLeave={() => setHoveredRating(0)}
//             onClick={() => {
//               setSelectedRating(rating);
//               setHoveredRating(0); // Reset hovered rating after selection
//             }}
//           />
//         ))}
//         <span className="ml-2 text-sm font-medium">
//           {selectedRating > 0 && `Selected Rating: ${selectedRating}`}
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Table className="shadow-lg rounded-lg overflow-hidden">
//         <TableCaption>A list of your recent Applied freelancer</TableCaption>
//         <TableHeader className="bg-gray-100">
//           <TableRow>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               FullName
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Email
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Contact
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Resume
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Date
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Status
//             </TableHead>
//             <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Ratings
//             </TableHead>
//             <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Action
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applicants &&
//             applicants?.applications?.map((item, index) => (
//               <TableRow
//                 key={item._id}
//                 className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//               >
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {item?.applicant?.fullname}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.email}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.phoneNumber}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.profile?.resume ? (
//                     <a
//                       className="text-blue-500 cursor-pointer hover:underline"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       href={item?.applicant?.profile?.resume}
//                     >
//                       {item?.applicant?.profile?.resumeOriginalName}
//                     </a>
//                   ) : (
//                     <span>NA</span>
//                   )}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item?.applicant?.createdAt.split("T")[0]}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <Badge
//                     className={`${
//                       item?.status === "rejected"
//                         ? "bg-red-500"
//                         : item?.status === "pending"
//                         ? "bg-gray-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     {item?.status.toUpperCase()}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {ratings[item._id] || 0}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal className="w-4 h-4 cursor-pointer" />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       {shortListingStatus.map((status, index) => (
//                         <div
//                           key={index}
//                           onClick={() => handleStatusClick(status, item._id)}
//                           className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
//                         >
//                           <span>{status}</span>
//                           {status === "Rate" && ratings[item._id] && (
//                             <span className="ml-2 text-sm text-gray-500">({ratings[item._id]})</span>
//                           )}
//                         </div>
//                       ))}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>

//       {/* Status Update Alert Dialog */}
//       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
//             <AlertDialogDescription>
//               Do you want to {selectedStatus?.toLowerCase()} this job application?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleConfirm}>
//               Confirm
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Rating Alert Dialog */}
//       <AlertDialog open={isRatingOpen} onOpenChange={setIsRatingOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Rate the Freelancer</AlertDialogTitle>
//             <AlertDialogDescription className="flex flex-col items-center gap-4">
//               <StarRating />
//               <span className="text-sm font-medium">
//                 Selected Rating: {selectedRating}
//               </span>
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => {
//               setSelectedRating(0);
//               setHoveredRating(0);
//             }}>
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction onClick={handleRatingConfirm}>
//               Confirm
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default ApplicantsTable;