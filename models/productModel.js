import mongoose from "mongoose";
 

const schema = new mongoose.Schema({
    productname:{
        type:String,
        require:[true,"enter product name"]
    },
    discription:{
        type:String,
        require:[true,"enter product discription"]
    },
    productimage:{
        type:Object
    },
    producttype:String,
    productprice:String,
    productqty:{
        type:Number,
    
    }



})
export const Product = mongoose.model("product",schema)