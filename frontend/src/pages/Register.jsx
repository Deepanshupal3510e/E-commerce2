import Lottie from "lottie-react";
import React, { useState } from "react";
import register from "../assets/register.json";
import text_logo from "../assets/text_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import AxiosTostError from "../utils/AxiostoastError";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmShowPassword, setisConfirmShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigte  = useNavigate()
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
    if (userDetails.password !== userDetails.confirmPassword) {
      return toast.error("password or confirm password must be same");
    }
    console.log(userDetails);



      const res = await Axios({
        ...summaryApi.register,
        data: userDetails,
      });
      if(res.data.error){
        toast.error(res.data.message)
      }
      if(res.data.success){
        toast.success(res.data.message)
        setUserDetails({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        navigte("/login")
      }
      console.log(res, "response");

  };

  return (
    <>
      <section className="w-full mx-auto mb-4 z-5 font-[Cambria]">
        <h1 className="text-center text-2xl md:text-4xl mt-10 mb-10 z-5">
          Welcome to OnlineShop
        </h1>
        <div className="md:flex">
          <div className=" w-full md:w-[50%]">
            <form
              onSubmit={handleFormSubmit}
              className="w-[90%] md:w-[70%]  mx-auto px-10 max-h-fit bg-gray-100 shadow-lg  rounded-lg p-10"
            >
              <h1 className="text-center text-2xl font-bold mb-10">Register</h1>

              <label className="text-violet-500 ml-6 block" htmlFor="name">
                Enter your name
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type="text"
                id="name"
                name="name"
                placeholder="Please enter your name"
                value={userDetails.name}
              />

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
                value={userDetails.email}
              />

              <label className="text-violet-500  ml-6 block" htmlFor="password">
                Create a password
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={userDetails.password}
              />
              <button
              type="button"
                className="relative right-7 top-1"
                onClick={handlePasswordShowClick}
              >
                {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>

              <label
                className="text-violet-500  ml-6 block"
                htmlFor="confirmPassword"
              >
                Please confirm your password
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 mb-2 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type={isConfirmShowPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={userDetails.confirmPassword}
              />
              <button
              type="button"
                className="relative right-7 top-1"
                onClick={handleconfirmsPasswordShowClick}
              >
                {isConfirmShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>

              <p className="text-red-700 text-sm m-0 p-0 text-center mt-3  ">
                {showErrorMessage}
              </p>

              <button
                // disabled={!validvalue}
                type="submit"
                className={`bg-violet-500 text-white w-[85%] mx-auto text-center mt-1 ml-[5%] h-10 rounded-lg hover:bg-violet-900 duration-200`}
              >
                Submit
              </button>

              <p className="text-center text-sm text-gray-500">
                already have a account |{" "}
                <Link to={"/login"} className="text-green-600 text-lg">
                  login
                </Link>
              </p>
            </form>
          </div>
          <div className="w-full md:w-[50%]">
            <Lottie animationData={register} className="w-[70%] mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
