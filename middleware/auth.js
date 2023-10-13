const asyncHandler =require("./asyncHandler.js");
const ErrorHandler =require("../utils/Errorhandler.js");
const jwt =require("jsonwebtoken");
const User =require("../models/UserModel.js");


const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.query;

  console.log("token",token);

  if (!token) {
    return next(
      new ErrorHandler("Pleaser login to access this resources", 401)
    );
  }

  // const decodeData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(token);

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.admin)) {
    return next(new ErrorHandler(`Role:${req.user.admin} is not allowed to access this routes`,403));
      }
      next();
      
    };
};


module.exports={isAuthenticatedUser,authorizeRoles};