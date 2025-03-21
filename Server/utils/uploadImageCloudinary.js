import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key : process.env.CLODINARY_API_KEY,
    api_secret : process.env.CLODINARY_API_SECRET_KEY

})
const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());


    const uploadImage = await new Promise((res , rej) => {
            cloudinary.uploader.upload_stream({folder: "onlineShop"} ,(err , uploadres) => {
                if(err) {
                    console.log(err)
                }else{
                    return res(uploadres)
                }
           
            }).end(buffer)
    })

    return uploadImage
}   


export default uploadImageCloudinary;