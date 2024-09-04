import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ msg: "Token not available" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ id: decoded.userId });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute ............");
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default protectRoute;
