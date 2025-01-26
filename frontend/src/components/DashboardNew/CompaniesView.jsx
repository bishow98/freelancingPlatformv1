import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteCompanyDialog } from "./DeleteDialog"
import PropTypes from 'prop-types';

const  CompaniesView = ({allDetails})=> {

    const companyDetails = allDetails[8]?.allCompanies;

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Companies</CardTitle>
      </CardHeader>
      <CardContent>
        {
          companyDetails.length <= 0 ? "No Companies Found" : (
            <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Jobs Posted</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyDetails.length <= 0 ? "No Jobs Found" :companyDetails.map((company) => (
              <TableRow key={company._id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company?.owner}</TableCell>
                <TableCell>{company.name.length}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <DeleteCompanyDialog />
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

CompaniesView.propTypes = {
  allDetails: PropTypes.array.isRequired,
};

export default CompaniesView;