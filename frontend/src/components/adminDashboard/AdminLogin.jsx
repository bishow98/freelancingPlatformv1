
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ADMIN_API_END_POINT } from "../utils/constants";
import { toast } from "sonner";
import { useState } from "react";


const AdminLogin = () => {
 const [input, setInput] = useState({
  email:"",
  password:"",
 })
  const navigate = useNavigate();

  //for the changed event 
  const changeEventHandler = (e) =>{
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ADMIN_API_END_POINT}/login`, input,{
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials:true,
      });

      if (res.data.success) {
        navigate("/superAdmin/dashboard");
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
     console.log("Error at the AdminLogin.jsx page",error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form 
          onSubmit={handleSubmit} 
          className="space-y-4">
            {/* {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )} */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;