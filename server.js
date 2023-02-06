import app from "./app.js";
import {connectionDB}  from './config/mongoDBconnection.js'
import cloudinary from "cloudinary"
import Razorpay from "razorpay"




connectionDB()
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET 

})


export const instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET
})

app.listen(5000,()=>console.log(`connected on port ${process.env.PORT} `))





// rzp_test_siyiLIrvEpC0Aj