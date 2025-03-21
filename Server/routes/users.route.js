
import {Router } from "express";
import {addAddress, forgotPassword, getAddress, getUserDetails, loginController, LogOutController, refreshToken, registerUserController, resetPasswordafterVerifyOtp, saveOrderDetails, updateUserDetails, uploadAvtar, verifyEmail, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/users.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const userRouter  = Router()


userRouter.post("/register" , registerUserController)
userRouter.post("/login" , loginController)
userRouter.get("/logout" , auth , LogOutController)
userRouter.put("/upload-avtar" , auth , upload.single('avtar'), uploadAvtar)
userRouter.post("/update-user", auth , updateUserDetails)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/forgot-password-verify-otp", verifyForgotPasswordOtp)
userRouter.post("/reset-password", resetPasswordafterVerifyOtp)
userRouter.post("/refresh-token" , refreshToken)
userRouter.post("/get-user-details" ,auth , getUserDetails)
userRouter.post("/add-address" , auth , addAddress)
userRouter.get("/get-address", auth , getAddress)
userRouter.post("/save-order-details" , auth , saveOrderDetails)
userRouter.post("/verify-email", verifyEmail)

export default userRouter