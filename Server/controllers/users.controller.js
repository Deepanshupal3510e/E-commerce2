import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../utils/verifyEmail.js";
import dotenv from "dotenv"
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { response } from "express";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTamplate from "../utils/forgotPasswordTemplet.js";
import  jwt  from "jsonwebtoken";
import addressModel from "../models/address.model.js";
import { trusted } from "mongoose";
dotenv.config()


export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "email , name , password are requried ",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })
        if (user) {
          return  res.json({
                message: "this email is already registerd",
                error: true,
                success: false,
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hasPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hasPassword
        }

        const newUser = new userModel(payload);
        const save = await newUser.save();


        const verifyEmialUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verificationEmail = await sendEmail({
            sendTo: email,
            subject: "verify email from online shops ",
            html: verifyEmailTemplate({
                name : name,
                url: verifyEmialUrl
            })
        })

        return res.json({
            message : "user registered succesfully ",
            error : false,
            success : true,
            data : save,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export const verifyEmailController = async  (req, res) => {
    try {
        const {code} = req.body;

        const user = await userModel.findOne({_id : code});
        if(!user) {
            return res.status(400).json({
                message : "user not exists",
                error : true,
                success : false
            })
        }
        const updateUser = await userModel.updateOne({_id : code}, {
            verify_email : true
        });
        return res.response(200).json({
            message : "verification succesfull",
            error : false , 
            success : true
        })
    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            error  : true , 
            success : false
        })
    }
}



export const loginController = async (req, res) => {
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(400).json({
                message : "email not registerd",
                error : true,
                success : false
            })
        }

        if(!password || password == "" || password == " "){
            return res.status(400).json({
                message : "password is required",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return res.status(401).json({
                message: "contact to admin to login",
                error : true,
                success : false
            })
        }


        const checkPassword = await bcryptjs.compare(password , user.password);
        if(!checkPassword){
            return res.status(400).json({
                message : "email or password is not matched",
                error : true,
                success : false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refresToken  = await generateRefreshToken(user._id)

        const cookeiOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

         res.cookie('accessToken', accessToken , cookeiOption)
         res.cookie('refresToken', refresToken , cookeiOption)

        const updateUser = userModel.findByIdAndUpdate(user._id , {
            last_login_date : new Date(),
            login_status : true,
        })
        return res.status(200).json({
            message : "user loged in succesfully",
            error : false,
            success : true,
            data : {
                accessToken: accessToken, 
                refresToken : refresToken,

            }
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}





export const LogOutController = async (req , res) => {
    try {

        const userid = req.userId

        if(!userid){
            return res.status(401).json({
                message : "please provide user id to logout",
                error : true,
                success : false
            })
        }

        const cookeiOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
            res.clearCookie("accessToken", cookeiOption)
            res.clearCookie("refresToken", cookeiOption)

            const removeRefreshToken  = await userModel.findByIdAndUpdate(userid , {
                refresh_token : "",
                login_status : false,
            })


            return res.json({
                message : "logout succesfully",
                error : false,
                success : true
            })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}





export const uploadAvtar = async (req , res) => {
    try {

        const userId = req.userId // auth middleware
        const image = req.file // multer middleware


        const upload = await uploadImageCloudinary(image)

        const updateUsers = await userModel.findByIdAndUpdate({_id : userId} , {
            avtar : upload.url
        })

         return res.status(200).json({
            avtar_url : upload.url,
            updateUsers,
            success : true,
            error : false
          })
        
    } catch (error) {
            res.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
    }
}





export const updateUserDetails = async (req , res) => {
    try {
        const userId = req.userId
        const {name ,  email , mobile} = req.body;
        console.log(req.body)
        // let hasPassword = ""
        // if(password){
        //     const salt = await bcryptjs.genSalt(10);
        //     hasPassword = await bcryptjs.hash(password, salt)
        // }

        const user = await userModel.findOne({email})
        if(user){
            return res.status(200).json({
                message : "this email is already exist",
                error : true,
                success : false
            })
        }
        const updateUser = await userModel.findByIdAndUpdate({_id: userId} , {
           ...(name && {name : name}),
           ...(email && {email : email}),
           ...(mobile && {mobile : mobile})
        })

        res.status(200).json({
            message :"details updated succesfully",
            error : false,
            success : true
        })

    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}




export const forgotPassword = async (req , res) => {
    try {
        const {email} = req.body;

        const checkuser = await userModel.findOne({email});
        if(!checkuser) {
            return res.status(400).json({
                message : "please enter a registerd email",
                error : true,
                success: false
            })
        }


        const otp = generateOtp();
        const expireTime = new Date() + 60 * 60 * 1000;

            console.log(otp , "otp")
            const update = await userModel.findByIdAndUpdate((checkuser._id),{
                forgot_password_otp : otp,
                forgot_password_expiry: new Date(expireTime).toISOString()
            })

            await sendEmail({
                sendTo: email,
                subject : "Forgot password",
                html : forgotPasswordTamplate({
                    name : checkuser.name,
                    otp : otp
                }),
            })

            return res.json({
                message : "check your email and enter the otp",
                otp: otp,
                error : false,
                success : true
            })
    } catch (error) {
       return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}




export const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const {email , otp} = req.body

        if(!email || !otp){
            return res.status(400).json({
                message : "email or otp is required",
                error : true,
                success : false
            })
        }

        const checkuser = await userModel.findOne({email});
        if(!checkuser) {
            return res.status(400).json({
                message : "please enter a registerd email",
                error : true,
                success: false
            })
        }

        const currentTime = new Date().toISOString();
        if(checkuser.forgot_password_expiry < currentTime){
            return res.json({
                message : "otp is expired please try again",
                error : true,
                success :false
            })
        }

        if(otp !== checkuser.forgot_password_otp){
            return res.status(400).json({
                message : "invalid otp ",
                error : true,
                success : false
            })
        }


        return res.json({
            message : "otp verified successfully know you can change your password",
            error : false,
            success : true
        })
    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error: true,
                success : false
            })
    }   
}



export const resetPasswordafterVerifyOtp  = async (req , res) => {
    try {
        
        const {email , newPassword , confirmPassword} = req.body;

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "please fill the required feilds email , newPassword , confirmPassowrd",
                error : true,
                success : false
            })
        };
    
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(400).json({
                message : "user not registered",
                error : true , 
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "newPassword must be match with confirmPassword",
                error: true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hasPassword = await bcryptjs.hash(newPassword, salt)

        const updateUser = await userModel.findByIdAndUpdate((user._id), {
            password : hasPassword,
        })


        res.json({
            success : true,
            error : false,
            message : "password updated succesfully",
            password : hasPassword,
            data : updateUser
        });

    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
    }
}




export const refreshToken = async (req , res) => {
    try {
            const refreshToken = req.cookies.refresToken || req?.header?.authorization?.split(" ")[1]
            if(!refreshToken){
                return res.status(200).json({
                    message : "token not available",
                    error : true,
                    success : false
                })
            }
            const verifyToken = await jwt.verify(refreshToken , process.env.SECRET_KEY_REFRESH_TOKEN)
            if(!verifyToken){
                res.status(401).json({
                    message : "refersh token in expired please login again",
                    error : true, 
                    success : false
                })
            }

            const userid = verifyToken?._id
            const newAccessToken  = await generateAccessToken(userid)

                
        const cookeiOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

            res.cookie("accessToken", newAccessToken , cookeiOption)
            
        return res.json({
            message: "new access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}





export const getUserDetails = async  (req , res) => {
    console.log("user details requested")
    try {

        const userId = req.userId 
       
    
       

        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({
                message : "user is not registerd",
                error : true,
                success : false,
                })
        }

        return res.status(200).json({
            message: "this is the user details",
            data : user,
            error : false,
            success : true
        })



        } catch (error) {
        return res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

   
};
export const addAddress = async (req, res) => {
    try {
        const { houseNo, roadNo, landmark, number, state, district, zipcode } = req.body;
        const userId = req.userId; // Ensure userId is taken from authentication middleware

        console.log(userId, "this is userId");

        // Check for missing fields
        if (!houseNo || !roadNo || !landmark || !number || !state || !district || !zipcode) {
            return res.status(400).json({
                message: "Please fill all fields",
                error: true,
                success: false
            });
        }

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
                error: true,
                success: false
            });
        }

        console.log("Address request received");

        // Create and save the new address
        const newAddress = new addressModel({
            houseNo,
            roadNo,
            landmark,
            number,
            state,
            district,
            zipcode,
            userId,
        });

        const savedAddress = await newAddress.save();

        // Update user's address details
        await userModel.findByIdAndUpdate(userId, {
            $push: { address_details: savedAddress}
        });

        return res.status(201).json({
            message: "Address added successfully",
            error: false,
            success: true,
            data: savedAddress
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};




export const getAddress = async (req , res) => {
    try {
            const userId = req.userId
            console.log(userId , "this is userId")

            const data = await addressModel.find({userId})


            return res.json({
                message : "this is user address data",
                error : false,
                success : true,
                data
            })
        
    } catch (error) {
            return res.status(500).json({
                message : error.messagee || error,
                success : false,
                error : true
            })
    }
}


export const saveOrderDetails = async (req, res) => {
    try {
            const {totalPrice , userId , orderId  , paymentStatus , otherDetails , products} = req.body

            console.log(req.body , " this is data by frontend")
            if(!totalPrice || !userId || !orderId || !paymentStatus || !products){
                return res.json({
                    message : "please provide all details",
                    success : false,
                    error : true
                })
            }

            const user = await userModel.findById(userId)
           

            if(!user){
                return res.status(401).json({
                    message : "user not exist",
                    error : true,
                    success : false
                })
            }

            const update = await userModel.findByIdAndUpdate(userId , 
            { $addToSet: { order_history : req.body } },
            {new : true}
            )


            return res.json({
                message : "order placed",
                success : true,
                error : false,
                data : update
            })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}


export const verifyEmail = async (req, res) => {
    try {
            const {userId} = req.body;
                console.log(req , " this is request")
            const user = await userModel.findById(userId)

        if(!user) {
            return res.status(400).json({
                message : "user not exist",
                error : true,
                success : false
            })
        }

        const updateUser = await userModel
        .findByIdAndUpdate(userId, {verify_email: true}, {new: true});


        return res.json({
            message : "email verified",
            success : true,
            error : false,
            data : updateUser
        })
    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                success : false,
                error  : true
            })
    }
}