import express from 'express'
import { loggedOut, loginUser, userInfo, userRegisterController } from '../controller/userRegisterController.js'
import  {isAuth}  from '../middlewares/isAuth.js'


const userRoute= express.Router()

userRoute.route('/register').post(userRegisterController)
userRoute.route('/login').post(loginUser)
userRoute.route('/logout').post(loggedOut)
userRoute.route('/info').get(isAuth,userInfo)


export default userRoute










