
import mongoose from "mongoose";


const userSchema  = new mongoose.Schema({
    name: {
        type : String,
        required : [true , "provide name"]
    },
    email : {
        type : String,
        unique : true,
        required : [true , "provide email"]
    },
    password : {
        type : String,
        required : [true , "provide password"]
    },
    avtar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : null
    },
    login_status : {
        type : String,
        default : false
    },
    refresh_token : {
        type : String,
        default : ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    last_login_date : {
        type : Date,
        default : ""
    },
    status : {
        type : String,
        enum : ["Active" , "Inactive" , "Suspended"],
        default : "Active"
    },
    address_details : [
        {
            type : Array,
            ref : "address"
        }
    ],
    shopping_cart: {
        type : Array,
        default : []
    },
    order_history: {
        type : Array,
        default : []
    },
    forgot_password_otp : {
        type : String,
        default : null
    },
    forgot_password_expiry : {
        type : Date ,
        default : null
    },
    role : {
        type : String,
        enum : ["ADMIN" , "USER"],
        default : "USER"
    },
    wishlist : {
        type : Array,
        default : null
    }
}, {timestamps : true})


const userModel =  mongoose.model("User" , userSchema)

export default userModel;