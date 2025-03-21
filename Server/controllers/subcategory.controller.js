import subCategoryModel from "../models/subcategory.mode.js";


export const addSubCategory = async (req , res) => {
    try {
            const {name , image, catogary} = req.body;


            if(!name && !image){
                return res.status(400).json({
                    message : "please fill the required feilds name, image or category",
                    error : true,
                    success : false
                })
            }

            if(catogary.length === 0){
                return res.status(200).json({
                    message : "please fill the required feilds name, image or category",
                    error : true,
                    success : false
                })
            }
            console.log(catogary.length === 0)

            const data = {
                name,
                image, 
                category : catogary.map((value) => {return value.name})
            }

            const newSubCategory = new subCategoryModel(data);
            const save = await newSubCategory.save()


            return res.json({
                message : "sub category created succesfully",
                error : false,
                success : true,
                data : save
            })

    } catch (error) {
            return res.status(500).json({
                message :error.message || error,
                error : true,
                success : false
            })
    }
}




export const getSubCategory = async (req, res) => {
    try {
        
        const result = await subCategoryModel.find().sort({createdAt : -1})

        return res.json({
            message : "that's all sub Category",
            error : false,
            success : true,
            data : result
        })
    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                success : false,
                error : true
            })
    }   
}





export const editSubCategory  = async (req , res) => {
    try {
        console.log(req.body , "data from request")
            const {_id , name , image , category} =req.body;

            console.log(_id , "id")
            if(!_id && !name && !image && category.length == 0){
                return res.status(400).json({
                    message : "please fill all feilds _id , name , image, category",
                    error : true,
                    success : false
                })
            };

            const check = await subCategoryModel.findById(_id);

            if(!check){
                return res.status(400).json({
                    message : "sub category not found",
                    error : true,
                    success : false
                })
            }


            console.log(check , "check")
            
          
            const update = await subCategoryModel.findByIdAndUpdate(_id, {
                name,
                image,
                category,
            }, {new : true})

                console.log(update , "update")
            return res.json({
                message : "category updated succesfully",
                success : true,
                error : false,
                data : update
            })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteSubCategory = async (req , res) => {
    try {
            const {_id} = req.body
            console.log(req.body , "request body")
            const deleted = await subCategoryModel.findByIdAndDelete(_id);

            return res.json({
                message : "sub Category deleted succesfully",
                error : false,
                success : true,
                data : deleted
            })
    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true,
                succes : false
            })
    }
}