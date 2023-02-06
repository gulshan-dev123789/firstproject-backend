import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { UserInfo } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { setToken } from "../utils/setToken.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary"
import { sendMail } from "../utils/sendMailer.js";
import crypto from "crypto"



export const userRegisterController = asyncErrorHandler(
  async (req, res, next) => {
    const {
      name: { firstName, lastName },
      email,
      password,
      age,
      gender,
      address: { country, state, postalCode, location },
      image
    } = req.body;
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !password ||
      !age ||
      !gender ||
      !country ||
      !state ||
      !postalCode ||
      !location
    ) {
      return next(new ErrorHandler("fill all fields", 400));
    }
    
    let rrole;
    if(email=="admin@gmail.com"&&password=="password"){
       rrole='admin'
    }else{ rrole="user"}
    let user = await UserInfo.findOne({ email });
    if (user) return next(new ErrorHandler("user already exist", 401));

    
     const imageresponse=await cloudinary.uploader.upload(image,{
        upload_preset:"user-image"
      })


   
    user = new UserInfo({
      name: { firstName, lastName },
      email,
      password,
      age,
      gender,
      address: { country, state, postalCode, location },
      role:rrole,
      image:imageresponse
    });
    user = await user.save();
    // console.log(user)

   res.status(201).json({
    success:true,
    message:"You have successfully registered"
   })
  }
);

export const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserInfo.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("enter email and password", 401));
  // console.log(user);

  const checkPass = await bcrypt.compare(password, user.password);

  if (!checkPass) return next( new ErrorHandler("incorrect email or password",404))
  
  setToken(res, user, "successfully logged in", 202);



});

export const loggedOut = asyncErrorHandler(async (req, res, next) => {
  console.log("loggout")
  res
    .status(200)
    .clearCookie("token", {
      expires: new Date(Date.now()),
      httpOnly: true,
      // secure:true, 
      // sameSite:"none"
     
      
      
    })
    .json({ success: true, message: "successfully logged out",auth:false }).redirect(`http://localhost:3000/register`)
    
});

export const userInfo = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserInfo.findById(req.user._id);
  res.status(201).json({
    success:true,
    user,
    
  })
});



export const forgotpassword = asyncErrorHandler(async (req,res,next)=>{
  // console.log("fprgotpasword")
  const {email}=req.body;
  const user= await UserInfo.findOne({email})
  if(!user) return next( new ErrorHandler("invalid email address",400))
  const generate= await user.forgetPasswordTokenGenerator()
  // console.log(generate)

  const url =`${process.env.FRONTEND}/user/api/resetpassword/${generate}`
  const text=`click on this link ${url} to reset your password, if you haven't send any request. please ignor`

   await sendMail(email,"resest password token",text)
   res.status(200).json({
    success:true,
    message:"you have successfully generated a reset token. check your email to reset your password"
   })
})


export const resetpassordtoken = asyncErrorHandler(async(req,res,next)=>{
  
  const {passwordtoken}=req.params
  // console.log(passwordtoken)
  
  const compareToken=   crypto.createHash("sha256").update(passwordtoken).digest("hex")
  const user = await UserInfo.findOne({compareToken})
  
  if (!user) return next(  new ErrorHandler("invalid token to generate password"))
  
  
  // console.log(user)
  user.password=req.body.password
  user.resetPasswordToken=null
  user.resetPasswordExpire=null
  await user.save()

})



export const addtocart = asyncErrorHandler(async(req,res,next)=>{
  const product =req.body
  // console.log("hhelo",product)
  if(product==null || product==undefined) return next( new ErrorHandler("cant not store null product",400))
 let  user = await UserInfo.findById(req.user._id)
  if(!user) return next(new ErrorHandler("please login to add items in cart",400))


    user.cart.push(product)
  user=  await user.save()
    // console.log(user)
  res.status(201).json({
    success:true,
    message:"you have successfully add an item to cart ",
    user
  })
  
})



export const removeFromCart = asyncErrorHandler(async(req,res,next)=>{
  const product =req.body
  // console.log("hhelo",product)
 let  user = await UserInfo.findById(req.user._id)
  if(!user) return next(new ErrorHandler("please login to add items in cart",400))
 
 const newCart =user.cart.filter((i)=>product._id.toString()!==i._id.toString())
  
 user.cart = newCart
 await user.save()
    // console.log(user)



  res.status(201).json({
    success:true,
    message:"you have delete the item from cart ",
    user
  })
  
})







export const addingquantity = asyncErrorHandler(async(req,res,next)=>{
 const {qty,id}=req.body
 const user =  await UserInfo.findById(req.user._id)
  if(!user) return next(new ErrorHandler("please login to add more item",400))

  // const filterarry =user?.cart?.filter((i)=>id!==i._id)


// let newCart=user?.cart?.filter((i)=> i._id===id)
// newCart[0].productqty= Number(qty)

// const addcartqytNewCart = [...filterarry,newCart].flat()
// console.log(addcartqytNewCart) 


const addcartqytNewCart=user?.cart.reduce(((acc,cur) => {
  if(cur._id === id) {
    cur.productqty = Number(qty)
    return [...acc,cur]
  }
  return [...acc,cur]
}),[])

user.cart=addcartqytNewCart
await user.save()
// console.log(user.cart)
res.status(201).json({
    success:true,
    message:"successfully changed quantity",
    user
  })
  
})












// let final ={}
// const obj ={
//   name:{
//     firstName:"gulshan",
//     lastName:"bhardwaj"
//   },
//   address:{
//     country:{
//       state:{
//         local:'harit vihar'
//       }
//     }
//   }
// }
// function check (obj,objr){
  

//   for (key in obj){
//     if(typeof(obj[key])=="object"){
//       check(obj[key],objr+"-"+key)
//     }
//     else{
//       final[objr+"-"+key]=obj[key]
//     }





//   }
// }

// check(obj,"obj")rs
