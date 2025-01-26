import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import axios from 'axios';
// import { ADMIN_API_END_POINT } from '../utils/constants';
// import { toast } from 'sonner';

// const handleDelete = async ({user})=>{
//   // Perform delete operation here
//   // Assuming axios is used for making API calls
//   try {
//     await axios.delete(`${ADMIN_API_END_POINT}/remove/${user._id}`,{withCredentials: true});
    
//   } catch (error) {
//     toast.error(error.response.data.message);
//     console.log("Error deleting the information",error);
    
//   }
  
//   console.log("delete button clicked");
// }

export function  DeleteDialog  ({ title, description }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteUserDialog() {
  // Perform delete operation here
  // Assuming axios is used for making API calls
  // handleDelete({user});
  // toast.success('User deleted successfully');
  return (
    <DeleteDialog
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete the user account."
    />
  );
}

export function DeleteJobDialog() {
  // Perform delete operation here

  return (
    <DeleteDialog
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete the job posting."
    />
  );
}

export function DeleteCompanyDialog() {
  return (
    <DeleteDialog
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete the company and all associated jobs."
    />
  );
}

