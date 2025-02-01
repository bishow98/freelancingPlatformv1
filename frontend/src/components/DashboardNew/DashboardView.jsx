
import { useState } from "react";
import { Building2, Users, Briefcase, FileText, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardView = ({ allDetails, onDeleteUser }) => {
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, userId: null });

  const pieData = [
    { name: "Freelancers", value: allDetails[1]?.freelancers },
    { name: "Clients", value: allDetails[2]?.clients },
  ];

  const recentUsersData = allDetails[6]?.recentUsers?.slice(0, 5);

  const handleDelete = async () => {
    if (deleteDialog.userId) {
      await onDeleteUser(deleteDialog.userId);
      setDeleteDialog({ isOpen: false, userId: null });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allDetails[0]?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Freelancers: {allDetails[1]?.freelancers} | Clients:{" "}
              {allDetails[2]?.clients}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allDetails[3]?.totalJobs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allDetails[4]?.totalCompanies}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allDetails[5]?.totalApplications}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {!recentUsersData?.length ? (
              <div className="text-center py-4">No recent users</div>
            ) : (
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
                  {recentUsersData.map((user) => (
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
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4">
               {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
DashboardView.propTypes = {
  allDetails: PropTypes.arrayOf(
    PropTypes.shape({
      totalUsers: PropTypes.number,
      freelancers: PropTypes.number,
      clients: PropTypes.number,
      totalJobs: PropTypes.number,
      totalCompanies: PropTypes.number,
      totalApplications: PropTypes.number,
      recentUsers: PropTypes.arrayOf(
        PropTypes.shape({
          fullname: PropTypes.string,
          email: PropTypes.string,
          role: PropTypes.string,
          createdAt: PropTypes.string,
        })
      ),
      recentJobs: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          company: PropTypes.string,
          createdAt: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default DashboardView;
            