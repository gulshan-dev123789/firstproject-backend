import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto"
import ErrorHandler from "../utils/errorHandler.js";
import { Payment } from "../models/paymentmodel.js";
import { UserInfo } from "../models/userModel.js";




export const razorpayApiKey = asyncErrorHandler(async(req,res,next)=>{
res.status(201).json({
    apiKey:process.env.RAZOR_KEY_ID
    })
})


export const createorder = asyncErrorHandler(async(req,res,next)=>{

const {bill} = req.body

const  options = {
    amount: bill,  // amount in the smallest currency unit
    currency: "INR",
    
    };
    const result= await instance.orders.create(options);
    console.log(result)
    res.status(201).json({
        success:true,
        data:result
    })
})



export const paymentVarification =  asyncErrorHandler( async(req,res,next)=>{
    console.log("payment")
const{razorpay_payment_id,razorpay_order_id,razorpay_signature}= req.body

const user = await UserInfo.findById(req.user._id)

if(!user)return next(new ErrorHandler("please login again",400))

const  body=razorpay_order_id + "|" + razorpay_payment_id;


const expectedSignature = crypto.createHmac('sha256',process.env.RAZOR_SECRET).update(body.toString()).digest('hex');
                                

if(expectedSignature !== razorpay_signature) return next(new ErrorHandler("invalid PIN",405))


const payment = await Payment.create({
    razorpay_payment_id,razorpay_order_id,razorpay_signature
})

user.cart=[]
await user.save()

res.redirect(`http://localhost:3000/payment?id=${razorpay_payment_id}`)
console.log("success")
})