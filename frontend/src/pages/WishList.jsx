import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import { setUserDetails } from "../store/userDetails";
import toast from "react-hot-toast";
import NoData from "../components/NoData";

const Wishlist = () => {
  const isMobile = useMobile();
  const [showDashboard, setShowDashboard] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [wishlist, setWishList] = useState([]);

  console.log(wishlist , "wishlist")
  const removeFromCart = async (value) => {
      const res = await Axios({
        ...summaryApi.removeFromWishlist,
        data : {
          id : user._id,
            product : value
        }
      })
      console.log(res , "this is result")
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(setUserDetails(res.data.data))
      }
  }

  const handleCartClick = async (data) => {
    if(!user.name){
        Navigate("/login")
    }
    const res = await Axios({
        ...summaryApi.addToCart,
        data : {
            userId : user._id,
            product : data
        }
    })
        if(res.data.success){
          removeFromCart(data)
          toast.success(res.data.message)
          console.log(res.data.data, "user Data")
          dispatch(setUserDetails(res.data.data))
        }
  } 

  useEffect(() => {
    setWishList(user?.wishlist)
  },[user.wishlist])

  return (
    <>
      <section className={`flex min-h-full mt-6 `}>
        <section
          className={`w-[20%]  min-h-full ${isMobile[0] ? "hidden" : "block"}`}
        >
          <Dashboard />
        </section>
        <section
          className={`w-full border-[2px] border-amber-100 rounded-md h-screen`}
        >
          <div className="flex shadow-md w-[100%] justify-between px-3 mt-2 items-center pb-3">
            <p className="font-bold text-md md:text-2xl">Wishlist </p>
            
          </div>

          <button
            className={`${
              isMobile[0] ? "" : "hidden"
            } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center relative top-[-110px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>

          <section className="w-[90%] h-auto md:flex flex-wrap gap-10 mt-10 p-6">

            {
              wishlist?.length ? wishlist.map((value) => {
                return (
                  <div key={value.name} className="group w-50 h-auto shadow-md rounded-md p-4 duration-400">
                    <FaHeart
                              size={20}
                              className={`relative left-[90%] text-red-500`}
                              onClick={(e) => removeFromCart(value)}
                            />
                    <div className="w-full p-4 h-40 flex justify-center items-center">
                      <img
                        src={value.image[0]}
                        alt={value.name}
                        className="group-hover:scale-120 duration-400"
                      />
                    </div>
                    <p className="w-[90%] text-center line-clamp-2">
                      {value.name}
                    </p>
                    <button onClick={() => handleCartClick(value)} className="m-4 px-2 py-1 bg-amber-400 text-white rounded-md ">Add to Cart</button>
                  </div>
                );
              }) : <NoData />
            }
          </section>
        </section>
      </section>

      <section
        className={`absolute top-34 left-[-300px] md:hidden lg:hidden duration-700 ${
          isMobile[0] ? "" : "hidden"
        } ${showDashboard ? "left-[0px]" : "left-[-300px]"}`}
      >
        <Dashboard />
      </section>
    </>
  );
};

export default Wishlist;
