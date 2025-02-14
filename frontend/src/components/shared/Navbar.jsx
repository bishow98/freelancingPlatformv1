// import { PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants.js";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Work<span className="text-[#f83002]">Done</span>
          </h1>
        </div>

        <div className="flex items-center gap-14">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "client" ? (
              // <>
              //   <li>
              //     <Link to="/admin/companies">Companies</Link>
              //   </li>
              //   <li>
              //     <Link to="/admin/jobs">Jobs</Link>
              //   </li>
              // </>
              <>
                <li>
                  <Link to="/admin/companies" className="relative group">
                    Companies
                    <span className="absolute left-0 bottom-0 h-0.5 bg-black w-0 transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="relative group">
                    Jobs
                    <span className="absolute left-0 bottom-0 h-0.5 bg-black w-0 transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
              </>
            ) : (
              // <>
              //   <li>
              //     <Link to="/">Home</Link>
              //   </li>
              //   <li>
              //     <Link to="/jobs">Jobs</Link>
              //   </li>
              //   <li>
              //     <Link to="/browse">Browse</Link>
              //   </li>
              // </>
              <>
                <li>
                  <Link to="/" className="relative group">
                    Home
                    <span className="absolute left-0 bottom-0 h-0.5 bg-black w-0 transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="relative group">
                    Jobs
                    <span className="absolute left-0 bottom-0 h-0.5 bg-black w-0 transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="relative group">
                    Browse
                    <span className="absolute left-0 bottom-0 h-0.5 bg-black w-0 transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/signup">
                <Button variant="outline">Signup</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-[#6A3AC2] hover:bg-[#5b30a6]">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer items-center">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="items-center font-medium">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "freelancer" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
