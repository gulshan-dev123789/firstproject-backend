import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt'
import crypto from "crypto"

const schema= new mongoose.Schema({

    // name:String,
    // email:{
    //     type:String,
    //     validate:isEmail
    // },
    // password:{
    //     type:String,
    //     select:false

    // }


    name:{
        firstName:{
            type:String,
            required:[true,'please enter your first name'],
            minlength:[2,'enter valid frist name']
        },
        lastName:{
            type:String,
            required:[true,'please enter your last name'],
            minlength:[2,'enter valid last name']
        }
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please enter your email'],
        validate:isEmail,

    },
    password:{
        type:String,
        required:[true,'please set your password first'],
        minlength:[6,'password should be more than 6 character'],
        select:false
    },
    gender:{
        type:String,
        
    },

    age:{
        type:String,
        required:[true,'select age']
    },
    address:{
        country:{
            type:String,
            required:[true,'select your country'],

        },
        state:{
            type:String,
            required:[true,'select your state'],
            
        },
        postelCode:{
            type:Number
           
        },
        location:{
            type:String,
            required:[true,'Fill your address']
        }

    },
    image:{
        type:Object,
        
    },
    resetPasswordToken:String,
    resetPasswordExpire:String

    


})


schema.pre('save', async function(next){
    if(!(this.isModified("password"))) return next()


    this.password= await bcrypt.hash(this.password,12)
    next()
 
})






schema.methods.jwtToken=function (){
    return jwt.sign({_id:this._id},process.env.SCERETCODE,{expiresIn:'10d'})
}


schema.methods.forgetPasswordTokenGenerator= async function (){

 const restToken=  crypto.randomBytes(20).toString("hex")

 this.resetPasswordToken= crypto.createHash("sha256").update(restToken).digest("hex")
 this.resetPasswordExpire= Date.now()+15*60*1000

 return restToken



}




export const UserInfo= mongoose.model('userData',schema)

