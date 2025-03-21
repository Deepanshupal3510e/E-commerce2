
import mongoose from "mongoose";




const orderSchema = new mongoose.Schema({
        userid :{
            type : mongoose.Schema.ObjectId,
            ref : "User"
        },
        orderid : {
            type : String,
            required : [true , "provide order id"],
            unique : true
        },
        product_id : {
            type : mongoose.Schema.ObjectId,
            ref: "product"
        },
        product_details : {
            name : String, 
            image : Array
        },
        payment_id : {
            type : String, 
            default : ""
        },
        payment_Status : {
            type : String,
            default : ""
        },
        delivery_address : {
            type : mongoose.Schema.ObjectId , 
            ref : "address"
        },
        sub_total : {
            type : Number,
            default : null
        },
        total_amount : {
            type : Number , 
            default : null
        },
        invoice_reciept : {
            type : String,
            default : ""
        }
}, {
    timestamps:true
})


const orderModel = mongoose.model("order" , orderSchema);


export default orderModel
