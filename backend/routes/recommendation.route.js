import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getRecommendedJobs } from '../controllers/recommendation.controller.js';

const router = express.Router();


router.route('/recommend-jobs').get(isAuthenticated, getRecommendedJobs)


export default router;