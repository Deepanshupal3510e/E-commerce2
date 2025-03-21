import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    landmark:{
        type : String,
        default :""
    },
    houseNo : {
        type : String,
        default : ""
    },
    roadNo : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    zipcode : {
        type : Number,
        default : ""

    },
    district :{
        type : String,
        default : ""
    },
    number : {
        type : String,
        default : ""
    },
    status : {
        type : Boolean,
        default: true
    },
    userId : {
        type : String,
        default : "",
    }
}, {timestamps: true})



const addressModel = mongoose.model("address" , addressSchema);


export default addressModel