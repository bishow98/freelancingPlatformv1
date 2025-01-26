import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { DeleteJobDialog } from "./DeleteDialog"
import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trash2 } from "lucide-react";

const  JobsView = ({allDetails})=> {

    const recentJobsData = allDetails[7]?.recentJobs;
  console.log(recentJobsData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {
          recentJobsData.length <= 0 ? " No Jobs Available" : (
            <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentJobsData.length <= 0 ? "No Jobs Available" : recentJobsData.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.budget}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>
                <Popover >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              // onClick={() => setIsOpen(true)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                  Confirm Deletion
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Are you sure you want to delete{" "}
                                  {/*user.fullname*/}?
                                </p>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  // onClick={() => setIsOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  // onClick={handleDelete}
                                >
                                  Confirm
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

          )
        }
        
      </CardContent>
    </Card>
  )
}
JobsView.propTypes = {
  allDetails: PropTypes.arrayOf(
    PropTypes.shape({
      recentJobs: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          title: PropTypes.string,
          company: PropTypes.shape({
            name: PropTypes.string,
          }),
          budget: PropTypes.number,
          createdAt: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default JobsView;