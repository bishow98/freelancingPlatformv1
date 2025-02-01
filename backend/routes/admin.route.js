import express from "express";
import { adminDashboard, adminLogin, adminLogout, adminRegister, deleteCompany, deleteJob, removeUser } from "../controllers/admin.controller.js";
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
adminRoute.route("/removeUsersData/:id").delete(adminAuthMiddleware,removeUser)

//for the remove of the jobs and their details 
adminRoute.route("/removeJobsData/:id").delete(adminAuthMiddleware,deleteJob)

//for the remove of the companies and their details 
adminRoute.route("/removeCompaniesData/:id").delete(adminAuthMiddleware,deleteCompany)









export default adminRoute