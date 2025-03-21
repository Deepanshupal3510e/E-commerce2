import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

export const uploadImageController = async (req , res) => {
    try {
            const file   = req.file
            console.log(file , "this is image file") 

            const response = await uploadImageCloudinary(file)
            if(!response){
                return res.json({
                    message : "image not uploaded please try again ",
                    error : true,
                    success : false
                })
            }

            return res.json({
                message : "image uploaded succesfully",
                error : false,
                success : true,
                data : response
            })

    } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true, 
                success : false
            })
    }
}