import React, { useEffect, useState } from "react";
import text_logo from "../assets/text_logo.png";
import Input from "./Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";
import useMobile from "../hooks/useMobile";
import { HiShoppingCart } from "react-icons/hi";
import Axios from "../utils/axios";
import logo from "../assets/circle_logo.png";
import { HiH1 } from "react-icons/hi2";
import summaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import {setUserDetails} from "../store/userDetails";
import fetchUserDetails from "../utils/fetchUserDetails";





const Header = () => {
  const [isLogin, setisLogin] = useState(false);
  const [isMobile] = useMobile();
  const location = useLocation();
  const isshowSearch = location.pathname === "/search" && isMobile;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);





  const getLocalStorage = async () => {
    const result = localStorage.getItem("onlineShops");
    if(result){
      const userData = await  fetchUserDetails();
      dispatch(setUserDetails(userData?.data))
    }

  }



  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleDashboardClick = () => {
    if(user.email === undefined){
      navigate("/login")
    }else{
      if(user.role == "adming"){
        navigate("/products")
      }else{
        navigate("my-cart")
      }
    }
    
  }

  useEffect(  ()=> {
    getLocalStorage()
   },[])


  return (
    <>
      <header className="md:shadow-xl  h-20 sticky top-0 z-1 bg-white">
        {isshowSearch ? (
          <div className=" px-6 md:hidden relative top-4 ">
            <Input />
          </div>
        ) : (
          <div className="container mx-auto flex justify-between px-4 lg:px-10 items-center h-full">
            <div className=" flex justify-center items-center h-full">
              <Link to={"/"}>
                <img
                  className="h-14 md:h-14 lg:h-22"
                  src={text_logo}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <Input />
            </div>
            <div>
              <div className=" flex items-center justify-end gap-3 lg:pr-6">
                <Link to={"/search"} className=" md:hidden">
                  Search
                </Link>
                <div className={` max-w-fit h-10  inline text-3xl text-neutral-500`}>
                  {user.name ? (
                    user.avtar ? (
                      <img
                        className="w-10 h-10 rounded-full cursor-pointer"
                        src={user.avtar}
                        alt="user Avtar"
                        onClick={() => navigate("/my-account")}
                      />
                    ) : (
                      <LuCircleUserRound
                        onClick={() => navigate("/my-account")}
                      />
                    )
                  ) : (
                    <button
                      onClick={redirectToLogin}
                      className={`${
                        isLogin ? "hidden" : "inline-block"
                      } bg-blue-700 rounded-md text-white border-0 outline-0 px-2 py-1 text-[15px] md:text-lg mr-4`}
                    >
                      Login
                    </button>
                  )}
                </div>

                  
                <button className="bg-green-700 rounded-lg border-0 outline-0 text-white w-fit px-2 py-2 hover:bg-green-900 duration-200 text-[10px] md:text-lg" onClick={(e) => handleDashboardClick(e)}>
                {user?.role == "admin" ? "Dashboard" : "My Cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
