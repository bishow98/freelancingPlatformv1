import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
const app = express();

dotenv.config({})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;


//Here goes API's and it goes like this "http://localhost:4000/api/v1/user/login or signup etc"
app.use("/api/v1/user",userRoute);

//for the companyRoute
app.use("/api/v1/company",companyRoute)

//for the jobRoute
app.use("/api/v1/job",jobRoute);

//for the applicationRoute 
app.use("/api/v1/application",applicationRoute)






app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);
  
  //connecting the database 
  connectDB();
});
