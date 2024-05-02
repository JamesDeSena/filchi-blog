const jwt = require("jsonwebtoken");
const AdminModel = require('../models/AdminModel');

const authToken = async (req, res, next) => {
  const { authorization } = req.headers;

  // Checks if there is a token available for authentication
  if (!authorization) {
    return res.status(401).json({ message: "Authorization Token Required" });
  }

  const token = authorization.split(" ")[1];

  // Verifies if the token is valid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in the AdminModel
    const user = await AdminModel.findById(decoded._id);
    
    // If user exists, attach user object to request and proceed to next middleware
    if (user) {
      req.user = decoded; // Attach decoded token payload to request
      next();
    } else {
      return res.status(404).json({ message: "User not found"});
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authToken;
