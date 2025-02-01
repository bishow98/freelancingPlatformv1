
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

const CompaniesView = ({ allDetails, onDeleteCompany }) => {
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, companyId: null });
  const companyDetails = allDetails[8]?.allCompanies;

  const handleDelete = async () => {
    if (deleteDialog.companyId) {
      await onDeleteCompany(deleteDialog.companyId);
      setDeleteDialog({ isOpen: false, companyId: null });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Companies</CardTitle>
      </CardHeader>
      <CardContent>
        {companyDetails?.length === 0 ? (
          <div className="text-center py-4">No Companies Found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyDetails?.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover
                      open={deleteDialog.isOpen && deleteDialog.companyId === company._id}
                      onOpenChange={(open) =>
                        setDeleteDialog({ isOpen: open, companyId: open ? company._id : null })
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
                              Are you sure you want to delete {company.name}?
                            </p>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setDeleteDialog({ isOpen: false, companyId: null })}
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

CompaniesView.propTypes = {
  allDetails: PropTypes.array.isRequired,
  onDeleteCompany: PropTypes.func.isRequired,
};

export default CompaniesView;