import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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


const CompaniesTable = () => {
  const { companies,searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany ] = useState(companies);
  const navigate = useNavigate();


useEffect(()=>{
  const filteredCompany = companies.length >= 0  && companies.filter((company)=>{
    if(!searchCompanyByText){
      return true;
    };
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
  });
  setFilterCompany(filteredCompany);
},[companies,searchCompanyByText])


  return (
    <div>
      {/* <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <tr key={company?._id}>
              <TableCell >
                <Avatar>
                  <AvatarImage src={company?.logo}></AvatarImage>
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="W-3" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table> */}
      <Table className="shadow-lg rounded-lg overflow-hidden">
  <TableCaption>A list of your recent registered companies</TableCaption>
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
      <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterCompany?.map((company, index) => (
      <TableRow key={company?._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <TableCell className="px-6 py-4 whitespace-nowrap">
          <Avatar>
            <AvatarImage src={company?.logo} alt={company?.name} />
          </Avatar>
        </TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company?.name}</TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company?.createdAt.split("T")[0]}</TableCell>
        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal className="w-4 h-4 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                <Edit2 className="w-4" />
                <span>Edit</span>
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

export default CompaniesTable;
