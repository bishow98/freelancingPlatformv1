// "use client"

// import { Building2, LayoutDashboard, LogOut, Users, Briefcase } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Tabs, TabsContent } from "@/components/ui/tabs"
// import DashboardView from "./DashboardView"
// import  JobsView  from "./JobsView"
// import  UsersView from "./UsersView";
// import CompaniesView from './CompaniesView'
// // import { useNavigate } from 'react-router-dom'


// const  Layout = ()=> {
//     // const navigate = useNavigate()
//   return (
//     <SidebarProvider>
//       <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
//         <Sidebar>
//           <SidebarHeader className="border-b px-6">
//             <div className="flex h-[60px] items-center">
//               <Building2 className="mr-2 h-6 w-6" />
//               <span className="font-semibold">Admin Dashboard</span>
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton value="dashboard" asActive>
//                   <LayoutDashboard className="h-4 w-4" />
//                   <span>Dashboard</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton value="jobs" asActive>
//                   <Briefcase className="h-4 w-4" />
//                   <span>Jobs</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton value="users">
//                   <Users className="h-4 w-4" />
//                   <span>Users</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton value="companies">
//                   <Building2 className="h-4 w-4" />
//                   <span>Companies</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarContent>
//         </Sidebar>
//         <div className="flex flex-col">
//           <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
//             <SidebarTrigger />
//             <div className="flex-1" />
//             <Button variant="ghost" size="icon">
//               <LogOut className="h-4 w-4" />
//               <span className="sr-only">Logout</span>
//             </Button>
//           </header>
//           <main className="flex-1 overflow-auto">
//             <div className="container py-6">
//               <Tabs defaultValue="dashboard">
//                 <TabsContent value="dashboard">
//                   <DashboardView />
//                 </TabsContent>
//                 <TabsContent value="jobs">
//                   <JobsView />
//                 </TabsContent>
//                 <TabsContent value="users">
//                   <UsersView />
//                 </TabsContent>
//                 <TabsContent value="companies">
//                   <CompaniesView />
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   )
// }

// export default Layout;

import { useEffect, useState } from "react";
import { Building2, LayoutDashboard, LogOut, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardView from "./DashboardView";
import JobsView from "./JobsView";
import UsersView from "./UsersView";
import CompaniesView from "./CompaniesView";
import axios from "axios";
import { ADMIN_API_END_POINT } from "../utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllDetails } from "../../redux/adminSlice";

const Layout = () => {
  // State to manage the active view
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const {allDetails} = useSelector(store=>store.admin);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/dashboard`,{withCredentials:true});
      // console.log(res.data.stats);
      if(res.data.success){
        // console.log(stats);
        // setStats(res.data.stats);
        dispatch(setAllDetails(res.data.stats))
        

      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // const handleDelete = async (id) => {
  //   try {
  //     // Make the API call to delete the item
  //     const res = await axios.delete(${ADMIN_API_END_POINT}/delete/${id}, { withCredentials: true });
      
  //     if (res.data.success) {
  //       // Update the allDetails state by filtering out the deleted item
  //       const updatedDetails = allDetails.filter((item) => item.id !== id); // Assuming 'id' is the unique identifier
  //       dispatch(setAllDetails(updatedDetails)); // Update the Redux store
  
  //       toast.success("Item deleted successfully!");
  //     } else {
  //       toast.error("Failed to delete the item.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting the item:", error);
  //     toast.error("An error occurred while deleting the item.");
  // }
  // };



  const renderView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView allDetails={allDetails} />;
      case "jobs":
        return <JobsView allDetails={allDetails} />;
      case "users":
        return <UsersView allDetails={allDetails} />;
      case "companies":
        return <CompaniesView allDetails={allDetails}/>;
      default:
        return <DashboardView allDetails={allDetails} />;
    }
  };

  const handleLogout = async() => {
    try {
        await axios.get(`${ADMIN_API_END_POINT}/logout`, {withCredentials: true});
        toast.success("Logged out successfully");
        navigate("/");
        
    } catch (error) {
        console.log("Error at handleLogout",error);
        
    }
   
  };

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar>
          <SidebarHeader className="border-b px-6">
            <div className="flex h-[60px] items-center">
              <Building2 className="mr-2 h-6 w-6" />
              <span className="font-semibold">Admin Dashboard</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab("dashboard")} value="dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab("jobs")} value="jobs">
                  <Briefcase className="h-4 w-4" />
                  <span>Jobs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab("users")} value="users">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveTab("companies")} value="companies">
                  <Building2 className="h-4 w-4" />
                  <span>Companies</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <Button onClick={handleLogout}variant="ghost" >
            <span >logout</span>    
            <LogOut className="h-4 w-4" />
            </Button>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container py-6">{renderView()}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

