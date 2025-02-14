import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job)
    // const appliedJob = [1,2,3,4,5]
  return (
    <div>
        {/* <Table>
            <TableCaption>List of your Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold">Job Role</TableHead>
                    <TableHead className="font-bold">Company</TableHead>
                    <TableHead className="text-right font-bold"> Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs<= 0 ? <span>You haven&apos;t applied for the Job Yet </span> : allAppliedJobs.map((appliedjob)=><>
                    <TableRow key={appliedjob?._id}>
                        <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedjob?.job?.title}</TableCell>
                        <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className={`${appliedjob?.status === "rejected" ? 'bg-red-500': appliedjob?.status ==="pending" ? 'bg-gray-500' : 'bg-green-500'}`}>{appliedjob?.status.toUpperCase()}</Badge> </TableCell>
                    </TableRow>
                    </>)
                }

            </TableBody>

        </Table> */}
        <Table className="shadow-lg rounded-lg overflow-hidden">
  <TableCaption>List of your Applied Jobs</TableCaption>
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</TableHead>
      <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {allAppliedJobs.length <= 0 ? (
      <tr>
        <TableCell colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
          You haven&apos;t applied for any jobs yet.
        </TableCell>
      </tr>
    ) : (
      allAppliedJobs.map((appliedjob, index) => (
        <TableRow key={appliedjob?._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appliedjob?.createdAt.split("T")[0]}</TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appliedjob?.job?.title}</TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appliedjob?.job?.company?.name}</TableCell>
          <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
            <Badge className={`${appliedjob?.status === "rejected" ? 'bg-red-500' : appliedjob?.status === "pending" ? 'bg-gray-500' : 'bg-green-500'}`}>
              {appliedjob?.status.toUpperCase()}
            </Badge>
          </TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
    </div>
  )
}

export default AppliedJobTable