import express from "express";
import { adminDashboard, adminLogin, adminLogout, adminRegister, removeUser } from "../controllers/admin.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";



const adminRoute = express.Router();

//for the admin to register
adminRoute.route("/register").post(adminRegister);

//for the admin to login 

adminRoute.route("/login").post(adminLogin);

//for the admin to logout

adminRoute.route("/logout").get(adminLogout)


//for the dashboard Statistics 
adminRoute.route("/dashboard").get(adminAuthMiddleware,adminDashboard);

//for the remove of the users and their details 
adminRoute.route("/remove/:id").delete(adminAuthMiddleware,removeUser)









export default adminRoute