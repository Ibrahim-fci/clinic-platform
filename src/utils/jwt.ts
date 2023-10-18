import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let TOKEN_SECRET = process.env.TOKEN_SECRE ? process.env.TOKEN_SECRE : "";

export default {
  generateAccessToken: (param: any) => {
    //{ expiresIn: "1800s" }
    return jwt.sign(param, TOKEN_SECRET);
  },

  verifyAccessToken: (token: any, res: any) => {
    try {
      return jwt.verify(token, TOKEN_SECRET);
    } catch (e) {
      return res.status(401).send("unauthorized");
    }
  },

  generateRefreshToken: (param: any) => {
    //{ expiresIn: "1800s" }
    return jwt.sign(param, TOKEN_SECRET);
  },

  verifyRefreshToken: (token: any, res: any) => {
    try {
      return jwt.verify(token, TOKEN_SECRET);
    } catch (e) {
      return res.status(401).send("unauthorized");
    }
  },
};
