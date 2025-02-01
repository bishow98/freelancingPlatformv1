
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
import { Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const UsersView = ({ allDetails, onDeleteUser }) => {
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, userId: null });
  const allUsers = allDetails[6]?.recentUsers;

  const handleDelete = async () => {
    if (deleteDialog.userId) {
      await onDeleteUser(deleteDialog.userId);
      setDeleteDialog({ isOpen: false, userId: null });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No Users Found</TableCell>
              </TableRow>
            ) : (
              allUsers?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user?.fullname}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell>{user?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover
                      open={deleteDialog.isOpen && deleteDialog.userId === user._id}
                      onOpenChange={(open) =>
                        setDeleteDialog({ isOpen: open, userId: open ? user._id : null })
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
                              Are you sure you want to delete {user.fullname}?
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setDeleteDialog({ isOpen: false, userId: null })}
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
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

UsersView.propTypes = {
  allDetails: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default UsersView;