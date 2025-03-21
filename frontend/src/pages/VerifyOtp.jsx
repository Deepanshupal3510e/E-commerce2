import Lottie from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import otp from "../assets/otp.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import AxiosTostError from "../utils/AxiostoastError";
import { IoLogIn } from "react-icons/io5";

const VerifyOtp = () => {
  const [userDetails, setUserDetails] = useState(["", "", "", "", "", ""]);
  const navigte = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  const emailid = location?.state?.email;

  useEffect(() => {
    console.log(emailid)
    if(!emailid){
      toast.error("please fill required details")
      navigte("/reset-password")
    }
  })
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);

    try {
      const res = await Axios({
        ...summaryApi.vefiyOtp,
        data:{
          otp : userDetails.join(""),
          email : location?.state?.email
        }
      });
      if (res.data.error) {
        toast.error(res.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        setUserDetails(["", "", "", "", "", ""]);
        navigte("/change-password" , {
          state : {
            status : true,
            email : emailid
          }
        });
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  return (
    <>
      <section className="w-full mx-auto mb-4 z-5 font-[Cambria]">
        <h1 className="text-center text-2xl md:text-4xl mt-10 mb-10 z-5">
          Reset your password
        </h1>
        <div className="md:flex">
          <div className=" w-full md:w-[50%]">
            <form
              onSubmit={handleFormSubmit}
              className="w-[90%] md:w-[70%]  mx-auto px-10 max-h-fit bg-gray-100 shadow-lg  rounded-lg p-10"
            >
              <h1 className="text-center text-2xl font-bold mb-10">
                Enter your OTP
              </h1>

              <div className="w-full flex flex-row justify-around">
                {userDetails.map((value, index) => {
                  return (
                    <>
                      <input
                        key={index + "otp"}
                        type="text"
                        className="w-[10%] h-10 font-semibold   border-0 text-center outline-0 bg-gray-300 rounded-lg text-2xl"
                        maxLength={1}
                        value={userDetails[index]}
                        onChange={(e) => {
                          const value = e.target.value;
                          if(value){
                            inputRef.current[index + 1]?.focus()
                          }
                          console.log(value, "value");
                          const newData = [...userDetails];
                          newData[index] = value;
                          setUserDetails(newData);
                        }}
                        ref={(ref) => {
                          inputRef.current[index] = ref;
                          return ref;
                        }}
                      />
                    </>
                  );
                })}
              </div>

              <button
                type="submit"
                className={`bg-violet-500 text-white w-[90%] mx-auto text-center  mt-3 ml-[5%] h-10 rounded-lg hover:bg-violet-900 duration-200`}
              >
                Submit
              </button>

              <p className="text-center text-sm text-gray-500">
                don't have a account |{" "}
                <Link to={"/register"} className="text-green-600 text-lg">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          <div className="w-full md:w-[50%]">
            <Lottie animationData={otp} className="w-[70%] mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyOtp;
