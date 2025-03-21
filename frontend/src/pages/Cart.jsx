import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../components/NoData";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userDetails";

const Cart = () => {
  const isMobile = useMobile();
  const [showDashboard, setShowDashboard] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  console.log(user.shopping_cart, "this is user");

  const handleNavigateClick = (value) => {
    const url =
      value.name.toLowerCase().replaceAll(" ", "-") +
      value._id.replaceAll("  ", "-");
    navigate(`/show-product-details/${url}`, {
      state: value,
    });
  };

  useEffect(() => {
    if (!user?.shopping_cart) return; // Ensure shopping_cart exists

    const newTotalPrice = user.shopping_cart?.reduce((acc, value) => {
      return acc + (value.price - value.price * (value.discount / 100));
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [user.shopping_cart]);


  const handleRemoveProdcutInCart = async (value) => {
      const res = await Axios({
        ...summaryApi.removeToCart,
        data : {
          userId : user._id,
          product : value
        }
      })

      if(res.data.success){
        toast.success(res.data.message)
        console.log(res.data.data)
        dispatch(setUserDetails(res.data.data))
      }
      if(res.data.error){
        toast.error(res.data.message)
      }
  }

  const handleBuyNowClick = () => {
    navigate("/my-orders", {
      state : {
        status: true
      }
    })
  }

  return (
    <>
      <section className={`flex h-auto mt-6 `}>
        <section
          className={`w-[20%]  h-auto ${isMobile[0] ? "hidden" : "block"}`}
        >
          <Dashboard />
        </section>
        <section
          className={`w-full border-[2px] border-amber-100 rounded-md h-auto`}
        >
          <div className="flex shadow-md w-[100%] justify-between px-3 mt-2 items-center pb-3">
            <p className="font-bold text-md md:text-2xl">My Cart</p>
            <button onClick={() => handleBuyNowClick()} className="p-2 bg-blue-400 text-white hover:bg-blue-500 duration-300 rounded-xl">
              Buy now
            </button>
          </div>

          <button
            className={`${
              isMobile[0] ? "" : "hidden"
            } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center relative top-[-110px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>

          <section className="md:w-[90%] md:flex flex-wrap md:justify-evenly mx-auto mt-4 gap-3 mb-6 ">
            { user ? (
              user.shopping_cart?.map((value) => {
                return (
                  <div
                    className=" h-auto shadow-md w-[90%] mx-auto pb-6 md:w-46 mt-6"
                   
                  >
                    <button onClick={(e) => handleRemoveProdcutInCart(value)} className="relative left-[90%]"><RxCross1 size={15} /></button>
                    <div className="flex justify-center items-center h-40 w-full "  onClick={() => handleNavigateClick(value)}>
                      <img
                        className="p-6 rounded-md w-auto h-40"
                        src={value.image[0]}
                        alt=""
                      />
                    </div>
                    <p className="line-clamp-2 text-center w-[90%] mx-auto mt-6"  onClick={() => handleNavigateClick(value)}>
                      {value.name}
                    </p>
                    <p className="w-[80%] mx-auto mt-3 font-bold">
                      Price :{" "}
                      {value.price - value.price * (value.discount / 100)}
                    </p>
                  </div>
                );
              })
            ) : (
              <NoData />
            )}
          </section>
          <div className="bg-gray-400 h-20 m-4 rounded-md flex justify-between items-center p-3">
            <p className="font-bold text-xl ">Total Price :-</p>
            <p>
              ₹{totalPrice?.toFixed(2) }
              <button onClick={() => handleBuyNowClick()} className="p-2 m-2 bg-blue-400 text-white hover:bg-blue-500 duration-300 rounded-xl">
                Buy now
              </button>
            </p>
          </div>
        </section>
      </section>

      <section
        className={`fixed top-34 left-[-300px] md:hidden lg:hidden duration-700 bg-white  rounded-lg${
          isMobile[0] ? "" : "hidden"
        } ${showDashboard ? "left-[0px]" : "left-[-300px]"}`}
      >
        <Dashboard />
      </section>
    </>
  );
};

export default Cart;
