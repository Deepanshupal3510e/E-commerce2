import mongoose from "mongoose";



const cardProductSchema = new mongoose.Schema({
    product_id : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref :"User"
    },

} , {
    timestamps : true
})


const cartProductModel = mongoose.model("cartProduct" , cardProductSchema);


export default cartProductModel