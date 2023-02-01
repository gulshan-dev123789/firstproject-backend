import app from "./app.js";
import {connectionDB}  from './config/mongoDBconnection.js'
import cloudinary from "cloudinary"





connectionDB()
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET 

})
app.listen(process.env.PORT,()=>console.log(`connected on port ${process.env.PORT} `))





// {
//     "name":{
//         "firstName":"gulshan",
//         "lastName":"bhardwaj"
//     },
//     "email":"goldy@gmail.com",
//     "age":23,
//     "password":"password",
//     "gender":"male",
//     "address":{
//         "country":"india",
//         "state":"delhi",
//         "postalCode":110084,
//         "location":"harit vihar"
//     }
    
// }