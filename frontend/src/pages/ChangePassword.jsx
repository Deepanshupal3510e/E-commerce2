import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import login from "../assets/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import AxiosTostError from "../utils/AxiostoastError";
import { IoLogIn } from "react-icons/io5";

const ChangePassword = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    newPassword: "",
    confirmPassword :""
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmShowPassword, setisConfirmShowPassword] = useState(false);
  const location = useLocation()


  const navigate  = useNavigate()



  useEffect(() => {
    const check = location.state.status;
    if(!check){
        navigate("/register")
    }else{
        userDetails.email = location.state.email
        console.log(location.state.email)
    }
  })


  const handlePasswordShowClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleconfirmsPasswordShowClick = () => {
    setisConfirmShowPassword(!isConfirmShowPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);



    try {
      const res = await Axios({
        ...summaryApi.ChangePassword,
        data: userDetails,
      });
      if(res.data.error){
        toast.error(res.data.message)
      }
      if(res.data.success){
        toast.success(res.data.message)
        setUserDetails({
          email: "",
          newPassword: "",
          confirmPassword : ""
        })
        navigate("/login")
      }
      console.log(res, "response");
    } catch (error) {
      AxiosTostError(error)
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
              <h1 className="text-center text-2xl font-bold mb-10">Reset password</h1>

             

              <label className="text-violet-500  ml-6 block" htmlFor="password">
                Enter your password
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="newPassword"
                placeholder="Create a strong password"
                value={userDetails.newPassword}
              />
              <button
              type="button"
                className="relative right-7 top-1"
                onClick={handlePasswordShowClick}
              >
                {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>


            
            
            
              <label className="text-violet-500  ml-6 block" htmlFor="confirmPassword">
                Confirm your password
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type={isConfirmShowPassword ? "text" : "password"}
                placeholder="Confirm your password"
                id="confirmPassword"
                name="confirmPassword"
                value={userDetails.confirmPassword}
              />
                 <button
              type="button"
                className="relative right-7 top-1"
                onClick={handleconfirmsPasswordShowClick}
              >
                {isConfirmShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
           



              <button
                type="submit"
                className={`bg-violet-500 text-white w-[85%] mx-auto text-center  mt-3 ml-[5%] h-10 rounded-lg hover:bg-violet-900 duration-200`}
              >
                Submit
              </button>

              <p className="text-center text-sm text-gray-500">
                i remember my password |{" "}
                <Link to={"/login"} className="text-green-600 text-lg">
                  login
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

export default ChangePassword;
