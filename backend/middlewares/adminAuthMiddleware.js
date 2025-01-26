import jwt from "jsonwebtoken";
export const adminAuthMiddleware = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized",
          success: false,
        });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        return res.status(403).json({
          message: "Forbidden",
          success: false,
        });
      }
  
      req.adminId = decoded.id;
      next();
    } catch (error) {
      console.error("Error in admin auth middleware:", error);
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
  };