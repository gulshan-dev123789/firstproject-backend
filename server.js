import app from "./app.js";
import {connectionDB}  from './config/mongoDBconnection.js'




connectionDB()
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