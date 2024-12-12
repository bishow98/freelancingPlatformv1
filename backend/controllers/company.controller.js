import { Company } from "../models/company.model.js";

//for registering a company
export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }
    const company = await Company.findOne({ name: name });
    if (company) {
      return res.status(400).json({
        message: "Can't register the company with same name",
        success: false,
      });
    }

    const companyRegister = await Company.create({
      name: name,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      companyRegister,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for the company to found
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user matra dinu paryo
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    };
    return res.status(200).json({
        message: "Company found successfully",
        companies,
        success: true,
    })
  } catch (error) {
    console.log(error);
  }
};

//get company by Id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for updating a company
export const updateCompany = async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file;
    //for the image file cloudinary is used

    const updateData = { name, description };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if(!company){
        return res.status(404).json({
            message:"Company not found",
            success:false
        })
    };

    return res.status(200).json({
        message:"company information updated successfully ",
        success:true,
    })
  } catch (error) {}
};
