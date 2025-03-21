import Lottie from "lottie-react";
import React, { useState } from "react";
import login from "../assets/login.json";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import AxiosTostError from "../utils/AxiostoastError";
import { IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {setUserDetails} from "../store/userDetails"
import fetchUserDetails from "../utils/fetchUserDetails";
const Login = () => {
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
 

  const navigte  = useNavigate()
  const dispatch = useDispatch()
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const handlePasswordShowClick = () => {
    setIsShowPassword(!isShowPassword);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserinfo((prev) => ({ ...prev, [name]: value }));

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();



    try {
      const res = await Axios({
        ...summaryApi.login,
        data: userinfo,
      });
      if(res.data.error){
        toast.error(res.data.message)
      }
      if(res.data.success){
        toast.success(res.data.message)
       const userinfo = await fetchUserDetails()
       dispatch(setUserDetails(userinfo.data));
       localStorage.setItem("onlineShops" , true)
        navigte("/" , {
          state :{
            email : userinfo.email
          }
      })
      setUserinfo({
          email: "",
          password: "",
        })
      }
    } catch (error) {
      AxiosTostError(error)
      console.log(error)
    }
  };

  return (
    <>
      <section className="w-full mx-auto mb-4 z-5 font-[Cambria]">
        <h1 className="text-center text-2xl md:text-4xl mt-10 mb-10 z-5">
          Login in OnlineShop
        </h1>
        <div className="md:flex">
          <div className=" w-full md:w-[50%]">
            <form
              onSubmit={handleFormSubmit}
              className="w-[90%] md:w-[70%]  mx-auto px-10 max-h-fit bg-gray-100 shadow-lg  rounded-lg p-10"
            >
              <h1 className="text-center text-2xl font-bold mb-10">Login</h1>

             

              <label className="text-violet-500  ml-6 block" htmlFor="Emial">
                Enter your Email
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type="email"
                placeholder="Please enter your email"
                id="email"
                name="email"
                value={userinfo.email}
              />

              <label className="text-violet-500  ml-6 block" htmlFor="password">
                Enter your password
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={userinfo.password}
              />
              <button
              type="button"
                className="relative right-7 top-1"
                onClick={handlePasswordShowClick}
              >
                {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>

            
            
             <Link to={"/reset-password"} className="text-right w-[90%] m-0  text-blue-500 hover:text-blue-900 block">forgot password</Link>
              <button
                type="submit"
                className={`bg-violet-500 text-white w-[85%] mx-auto text-center  mt-3 ml-[5%] h-10 rounded-lg hover:bg-violet-900 duration-200`}
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
            <Lottie animationData={login} className="w-[70%] mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
