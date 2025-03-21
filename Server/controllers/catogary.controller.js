import catogaryModel from "../models/category.model.js"
import subCategoryModel from "../models/subcategory.mode.js"
import productModel from "../models/product.model.js"

export const addNewCatogary = async (req , res) => {
   try {
        const {name ,  image} = req.body

        if(!image || !name){
            return res.status(400).json({
                message : "please provide name or image",
                error :  true, 
                success : false
            })
        }


        const addCatogary = new catogaryModel({
            name,
            image
        })

        const saveCatogary = await addCatogary.save();


        if(!saveCatogary){
            return res.status(500).json({
                message : "catogary not created",
                error : true,
                success : false
            })
        }

        return res.json({
            message : "catogary added succesfully",
            data : addCatogary,
            error : false,
            succes : true
        })
   } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success: false
        })
   }
}



export const getCatagory = async (req, res) => {
    try {
            const result = await catogaryModel.find();
            return res.json({
                message : "this is all catogories",
                error : false,
                success : true,
                data : result
            })
    } catch (error) {
            return res.error(500).json({
                message : error.message || error,
                success : false , 
                error : true
            })
    }
}




export const updateCatogary = async (req , res) => {
    try {
        const {_id , name , image} = req.body;


        const result = await catogaryModel.findByIdAndUpdate(_id , {
            name,
            image
        })

        return res.json({
            message : "Catagory updated",
            success : true,
            error : false,
            data : result
        })

    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true,
                succes : false
            })
    }   
}



export const deleteCatogary = async (req, res) => {
    const {_id} = req.body;

    try {

        console.log(_id)
        const checkSubCatogary = await subCategoryModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        const checkProuduct = await productModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        if(checkProuduct > 0 || checkSubCatogary > 0){
            return res.status(400).json({
                message : "catogary in use can't be delete",
                error : true,
                success : false
            })
        }

        const deleteProduct = await catogaryModel.deleteOne({_id : _id})


        return res.json({
            message : "catogary deleted successfully",
            error : false,
            success : true,
            data : deleteProduct
        })

    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
    }
}