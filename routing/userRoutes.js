import express from 'express'
import { addingquantity, addtocart, forgotpassword, loggedOut, loginUser, removeFromCart, resetpassordtoken, userInfo, userRegisterController } from '../controller/userRegisterController.js'
import  {isAuth}  from '../middlewares/isAuth.js'


const userRoute= express.Router()

userRoute.route('/register').post(userRegisterController)
userRoute.route('/login').post(loginUser)
userRoute.route('/logout').get(loggedOut)
userRoute.route('/info').get(isAuth,userInfo)
userRoute.route('/forgotpassword').post(forgotpassword)
userRoute.route('/resetpassword/:passwordtoken').post(resetpassordtoken)
userRoute.route('/addtocart').post(isAuth,addtocart)
userRoute.route('/removefromcart').post(isAuth,removeFromCart)
userRoute.route('/addingquantity').post(isAuth,addingquantity)



export default userRoute










