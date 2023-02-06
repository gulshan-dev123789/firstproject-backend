import express from "express";
import { productregister, productsend } from "../controller/productcontroller.js";
 const  productRouter = express.Router()

productRouter.route("/productregiter").post(productregister).get(productsend)



 export default productRouter;



