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

const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [allDetails, setAllDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/dashboard`, { withCredentials: true });
      if (res.data.success) {
        setAllDetails(res.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [allDetails]);

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/removeUsersData/${userId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        // Update the state by filtering out the deleted user
        setAllDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[6].recentUsers = updatedDetails[6].recentUsers.filter(
            user => user._id !== userId
          );
          return updatedDetails;
        });
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Error deleting user");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/removeJobsData/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        // Update the state by filtering out the deleted job
        setAllDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[7].recentJobs = updatedDetails[7].recentJobs.filter(
            job => job._id !== jobId
          );
          return updatedDetails;
        });
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      console.error("Delete job error:", error);
      toast.error("Error deleting job");
    }
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/removeCompaniesData/${companyId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        // Update the state by filtering out the deleted company
        setAllDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[8].allCompanies = updatedDetails[8].allCompanies.filter(
            company => company._id !== companyId
          );
          return updatedDetails;
        });
        toast.success("Company deleted successfully");
      }
    } catch (error) {
      console.error("Delete company error:", error);
      toast.error("Error deleting company");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${ADMIN_API_END_POINT}/logout`, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log("Error at handleLogout", error);
      toast.error("Error logging out");
    }
  };

  const renderView = () => {
    const viewProps = {
      allDetails,
      onDeleteUser: handleDeleteUser,
      onDeleteJob: handleDeleteJob,
      onDeleteCompany: handleDeleteCompany
    };

    switch (activeTab) {
      case "dashboard":
        return <DashboardView {...viewProps} />;
      case "jobs":
        return <JobsView {...viewProps} />;
      case "users":
        return <UsersView {...viewProps} />;
      case "companies":
        return <CompaniesView {...viewProps} />;
      default:
        return <DashboardView {...viewProps} />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

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
            <Button onClick={handleLogout} variant="ghost">
              <span>logout</span>
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

