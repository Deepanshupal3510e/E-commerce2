import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userDetails";
import { useDispatch } from "react-redux";

const VerifyEmail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    console.log(location.search);
    let userId = location.search
    userId = userId.split("?code=")[1]
    console.log(userId);
    const [redirectHome, setRedirectHome] = useState(false);

    const verifyEmail = async () => {
        try {
                const res = await Axios({
                    ...summaryApi.verifyEmails,
                    data : {
                        userId
                    }
                });
                if(res.data.success){
                    toast.success("Email verified successfully");
                    getUserDetails()
                    setRedirectHome(true);

                };
                if(res.data.error){\
                    toast.error("Email not verified please try again");
                }
        } catch (error) {
                console.log(error);
        }
    }


     const getUserDetails = async () => {
        const res = await Axios({
          ...summaryApi.getUserDetails
        })
        dispatch(setUserDetails(res.data.data))
      }


    useEffect(() => {
        verifyEmail()
    },[])
  return (
    <section className="container mx-auto w-full h-full bg-neutral-800 fixed top-0 left-0 z-90">
      <h1 className="text-center text-5xl mt-20">Online shop</h1>
      {redirectHome ? <div className="fixed top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white  rounded-md flex items-center justify-center flex-col gap-4 pb-10">
        <p className="w-full text-center mt-10 p-10">Email verified successfully go to the home page</p>
        <Link to="/" className="px-4 py-2 bg-green-500 text-white rounded-md border-0">Home</Link>
      </div> : ""}
      
    </section>
  );
};

export default VerifyEmail; 
