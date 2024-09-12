// src/middlewares/auth.guard.js
import jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { verifyToken } from "../helper/jwt.helper.js"; 
export const CheckAuthGuard = (isProtected) => {
  return (req, res, next) => { 
    if (!isProtected) {
      return next();
    }

    const token = req.headers["authorization"];
    if (!(token && token.startsWith("Bearer ") && token.split(" ")[1])) {
      throw new BadRequestException(`Given token: ${token} is invalid`);
    }
    const accessToken = token.split(" ")[1];

    try {
      verifyToken(accessToken);
      const decoded = jwt.decode(accessToken);
      if (!decoded || !decoded.id || !decoded.role) {
        throw new BadRequestException(`Invalid token data`);
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    } catch (error) {
      next(new BadRequestException(`Invalid or expired token: ${error.message}`));
    }
  };
  
};
