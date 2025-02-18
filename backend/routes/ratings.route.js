import express from "express";
import { rateCompany, rateFreelancer } from "../controllers/ratings.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

// route to rate a freelancer 
router.route("/rate/freelancer").post(isAuthenticated ,rateFreelancer);

//route t rate a company 
router.route("/rate/company").post(isAuthenticated, rateCompany);

export default router;