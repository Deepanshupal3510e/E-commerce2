import { useDispatch } from "react-redux"
import summaryApi from "../common/SummaryApi"
import Axios from "./axios"
import { setUserDetails } from "../store/userDetails"
const fetchUserDetails = async () => {


    try {
        const res = await Axios({
            ...summaryApi.getUserDetails
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails;