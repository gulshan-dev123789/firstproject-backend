import express from 'express'
import { config } from 'dotenv'
import userRoute from './routing/userRoutes.js'
import { errorBuilder } from './middlewares/errorBuiler.js'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app=express()

config({
    path:'./config/config.env'
})
app.use(cookieParser())
app.use(express.json()) 
app.use(express.urlencoded({
    extended:true
})) 

app.use('/user/api',userRoute)
app.use(cors({
    
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))
export default app
app.use(errorBuilder)

