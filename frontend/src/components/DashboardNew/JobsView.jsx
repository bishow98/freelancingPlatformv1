
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trash2 } from "lucide-react";

const JobsView = ({ allDetails, onDeleteJob }) => {
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, jobId: null });
  const recentJobsData = allDetails[7]?.recentJobs;

  const handleDelete = async () => {
    if (deleteDialog.jobId) {
      await onDeleteJob(deleteDialog.jobId);
      setDeleteDialog({ isOpen: false, jobId: null });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {recentJobsData?.length === 0 ? (
          <div className="text-center py-4">No Jobs Available</div>
        ) : (
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
              {recentJobsData?.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.budget}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover
                      open={deleteDialog.isOpen && deleteDialog.jobId === job._id}
                      onOpenChange={(open) =>
                        setDeleteDialog({ isOpen: open, jobId: open ? job._id : null })
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
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
                              Are you sure you want to delete {job.title}?
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setDeleteDialog({ isOpen: false, jobId: null })}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDelete}
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
        )}
      </CardContent>
    </Card>
  );
};

JobsView.propTypes = {
  allDetails: PropTypes.array.isRequired,
  onDeleteJob: PropTypes.func.isRequired,
};

export default JobsView;