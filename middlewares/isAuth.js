
import ErrorHandler from "../utils/errorHandler.js"
import  jwt  from "jsonwebtoken";
import { UserInfo } from "../models/userModel.js";


export const isAuth = async(req,res,next)=>{
   const  {token}=req.cookies
   console.log(token)
   if(!token) return next( new ErrorHandler("please login first",401))
  
   const decodedToken =  jwt.verify(token,process.env.SCERETCODE)
   console.log(decodedToken)
   req.user= await UserInfo.findById(decodedToken._id)
   next()
}