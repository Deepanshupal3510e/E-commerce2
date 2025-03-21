import summaryApi from "../common/SummaryApi";
import Axios from "./axios";

const uploadImage = async (image) => {
    try {

        const formData = new FormData()
        formData.append("image" , image)
        const res = await Axios({
            ...summaryApi.uploadImage,
            data : formData
        })
        return res;
    } catch (error) {
        return error
    }
}

export default uploadImage;