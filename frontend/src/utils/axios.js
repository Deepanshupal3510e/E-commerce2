import axios from "axios";
import summaryApi, { baseUrl } from "../common/SummaryApi";



const Axios = axios.create({
    baseURL : baseUrl,
    withCredentials : true,

})


Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if(accessToken){
            config.headers.authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


    Axios.interceptors.request.use(
        (Response) => {
            return Response
        },
        async (error) => {
            let originRequest = error.config
            if(error.response.status === 401 && !originRequest.retry){
                originRequest.retry = true
                const refresToken = localStorage.getItem("refresToken")



                if(refresToken) {
                   const newaccessToken = await refresAccessToken(refresToken);
                   if(newaccessToken){
                    originRequest.headers.authorization = `Bearer ${newaccessToken}`

                    return Axios(originRequest)
                   }
                }
            }

            return Promise.reject(error)
        }

    )



    const refresAccessToken =  async (refresToken) => {
        try {
                const response =  await Axios({
                    ...summaryApi.refreshToken,
                    headers : {
                        authorization : `Bearer ${refresToken}`  
                    } 
                })


               const AccessToken = response.data.data.accessToken
               localStorage.setItem('accessToken', AccessToken)
               return AccessToken
        } catch (error) {
            console.log(error)
        }
    }



export default Axios