import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary"

export const productregister = asyncErrorHandler(async (req, res, next) => {
  const {
    productname,
    discription,

    productprice,
    producttype,
    productimage
  } = req.body;

  if(!productname || !discription || !productprice || !producttype ) return next ( new ErrorHandler("please fill all details",400))

  const imageresponse=await cloudinary.uploader.upload(productimage,{
    upload_preset:"product-image"
  })

  const user = new Product({
    productname,discription,productprice,producttype,productimage:imageresponse
  })
  

    await user.save()
    res.status(201).json({
        success:true,
        message:"successfully created a product"
    })

});








export const productsend = asyncErrorHandler(async (req, res, next) => {




    const product = await Product.find()
    console.log(product)

    if(!product) return next( new ErrorHandler(" there is some problem in loading shop",404))
    
      res.status(201).json({
          success:true,
          product
          
      })
  
  });
  