import express from "express"
import { createorder, paymentVarification, razorpayApiKey } from "../controller/paymentcontroller.js";
import { isAuth } from "../middlewares/isAuth.js";

const paymentroute= express.Router()

paymentroute.route("/razorpaykey").get(razorpayApiKey)
paymentroute.route("/createorder").post(isAuth,createorder)
paymentroute.route("/paymentvarification").post(isAuth,paymentVarification)










export default paymentroute;