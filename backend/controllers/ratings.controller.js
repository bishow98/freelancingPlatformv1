import { Company } from "../models/company.model.js";
import { CompanyRating } from "../models/companyRating.model.js";
import { User } from "../models/user.model.js";


export const rateFreelancer = async (req, res) => {
    const { freelancerId, rating, jobId, ratedBy } = req.body;
  
    try {
      // Validate rating
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }
  
      // Find the freelancer
      const freelancer = await User.findById(freelancerId);
      if (!freelancer || freelancer.role !== "freelancer") {
        return res.status(404).json({ message: "Freelancer not found" });
      }
  
      // Add the rating
      freelancer.profile.ratings.push({ ratedBy, rating, job: jobId });
  
      // Calculate the average rating
      const totalRatings = freelancer.profile.ratings.length;
      const sumRatings = freelancer.profile.ratings.reduce((sum, r) => sum + r.rating, 0);
      const grandTotalRatings = sumRatings / totalRatings;
      freelancer.profile.averageRating = Number(grandTotalRatings.toFixed(1));
  
      await freelancer.save();
  
      res.status(200).json({ message: "Freelancer rated successfully", freelancer });
    } catch (error) {
      res.status(500).json({ message: "Error rating freelancer", error });
    }
  };


//now for the ratings of the company by the freelancer 
export const rateCompany = async(req,res) => {
    const {companyId, rating, jobId, ratedBy} = req.body;

    try {
        //validate the rating 
        if(rating < 1 || rating > 5){
            return res.status(400).json({
                message: "Rating must be between 1 and 5",
                success: false,
            })
        }

        //find the company 
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: "Company not found",
                success: false,
            })
        }

        //Create a new company rating 
        const companyRating = new CompanyRating({
            company: companyId,
            ratedBy,
            rating,
            job: jobId,
        });

        await companyRating.save();
        


        //calculate the average rating for the comapany 
        const ratings = await CompanyRating.find({ company: companyId});
        const totalRatings  = ratings.length;
        const sumRatings = ratings.reduce((sum,r ) => sum + r.rating, 0);

        company.averageRating = sumRatings / totalRatings; 
        await company.save();
        
        return res.status(200).json({ message: "Company rated Successfully", company, success: true});

        
    } catch (error) {
        console.log("Error at the rateCompany method: ",error);
        return res.status(500).json({ message: "Error rating company at rateCompany", success: false});
        
    }
}