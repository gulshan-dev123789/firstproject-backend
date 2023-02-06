import express from 'express'
import { config } from 'dotenv'
import userRoute from './routing/userRoutes.js'
import { errorBuilder } from './middlewares/errorBuiler.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
import productRouter from './routing/productrouting.js'
import paymentroute from './routing/paymentroute.js'


const app=express()

config({
    path:'./config/config.env'
})


app.use(express.json()) 
app.use(express.urlencoded({
    extended:true
})) 


app.use(cors({
    // origin:"http://localhost:3000",
    credentials:true,
    methods:["POST","GET"]
}))
app.use(cookieParser())




app.use("/api",productRouter)
app.use('/user/api',userRoute)
app.use("/api",paymentroute)

export default app
app.use(errorBuilder)

