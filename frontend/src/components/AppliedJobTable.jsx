import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job)
    // const appliedJob = [1,2,3,4,5]
  return (
    <div>
        <Table>
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

        </Table>
    </div>
  )
}

export default AppliedJobTable