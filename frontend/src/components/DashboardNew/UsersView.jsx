import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteUserDialog } from "./DeleteDialog"
import PropTypes from 'prop-types';

const  UsersView = ({allDetails})=> {

    const allUsers = allDetails[6]?.recentUsers;

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
            {allUsers.length < 0 ?"No Users Found": allUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user?.fullname}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <DeleteUserDialog />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

UsersView.propTypes = {
  allDetails: PropTypes.array.isRequired,
};

export default UsersView;