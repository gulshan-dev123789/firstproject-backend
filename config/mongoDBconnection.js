import mongoose from 'mongoose'
export const connectionDB= ()=>{
     mongoose.connect(process.env.MONGGOOSEPORT).then(()=>console.log('connected with database')).catch((err)=>console.log(`error of coonection mongo ${err}`))
}