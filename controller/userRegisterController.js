import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { UserInfo } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { setToken } from "../utils/setToken.js";
import bcrypt from "bcrypt";

export const userRegisterController = asyncErrorHandler(
  async (req, res, next) => {
    const {
      name: { firstName, lastName },
      email,
      password,
      age,
      gender,
      address: { country, state, postalCode, location },
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

    let user = await UserInfo.findOne({ email });
    if (user) return next(new ErrorHandler("user already exist", 401));
    user = new UserInfo({
      name: { firstName, lastName },
      email,
      password,
      age,
      gender,
      address: { country, state, postalCode, location },
    });
    user = await user.save();

    setToken(res, user, "you have successfully registered", 201);
  }
);

export const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserInfo.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("user not exits", 404));
  console.log(user);

  const checkPass = await bcrypt.compare(password, user.password);

  if (checkPass) {
    setToken(res, user, "successfully logged in", 201);
  }
});

export const loggedOut = asyncErrorHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()), 
      httpOnly: true,
      secure: true,
    })
    .json({ success: true, message: "successfully logged out",auth:false });
});

export const userInfo = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserInfo.findById(req.user._id);
  res.status(201).json({
    success:true,
    user,
    auth:true
  })
});
