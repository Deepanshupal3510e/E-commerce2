import React, { useState } from "react";
import update_details from "../assets/update_details.json";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
const UpdateUserDetails = () => {
  const user = useSelector(state => state.user)
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(userDetails);

    try {
      const res = await Axios({
        ...summaryApi.updateUserDetails,
        data: userDetails,
      });
      if (res.data.error) {
        toast.error(res.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        setUserDetails({
          name: "",
          email: "",
          mobile: "",
        });
        navigate("/");
      }
      console.log(res, "response");
    } catch (error) {
      console.log(error);
    }
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
              <h1 className="text-center text-2xl font-bold mb-10">
                Update Details
              </h1>

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

              <label className="text-violet-500  ml-6 block" htmlFor="email">
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

              <label className="text-violet-500  ml-6 block" htmlFor="mobile">
                Enter your mobile No.
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-[85%] h-10 ml-[5%] pl-3 text-gray-700 mt-1 border-1 rounded-lg focus-within:outline-violet-500"
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Please Enter you mobile No."
                value={userDetails.mobile}
              />

              <button
                type="submit"
                className={`bg-violet-500 text-white w-[85%] mx-auto text-center mt-1 ml-[5%] h-10 rounded-lg hover:bg-violet-900 duration-200`}
              >
                Submit
              </button>

              <p className="text-center text-sm text-gray-500">
                don't have a account |{" "}
                <Link to={"/register"} className="text-green-600 text-lg">
                  SignUp
                </Link>
              </p>
            </form>
          </div>
          <div className="w-full md:w-[50%]">
            <Lottie
              animationData={update_details}
              className="w-[70%] mx-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateUserDetails;
