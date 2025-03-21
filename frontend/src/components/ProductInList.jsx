import React, { useEffect, useState } from "react";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userDetails";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductInList = ({ value }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [checkWishlist, setCheckWishlist] = useState(false);
  const wishlist = user.wishlist;

  const handleHeartClick = async (id, name) => {
    console.log(value, user._id, "this is product details");
    if(checkWishlist){
      try {
        const res = await Axios({
          ...summaryApi.removeFromWishlist,
          data : {
            id : user._id,
            product : value
          }
        })
        if(res.data.success){
          dispatch(setUserDetails(res.data.data))
          toast.success(res.data.message)
          setCheckWishlist(false)
        }
      } catch (error) {
          console.log(error , "error while removing product from wishlist")
      }


    } else {
      try {
        const res = await Axios({
          ...summaryApi.addToWishlist,
          data: {
            userId: user._id,
            product: value,
          },
        });
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setUserDetails(res.data.data))
        }
        if (res.data.error) {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (wishlist?.some((item) => item._id === value._id)) {
      setCheckWishlist(true);
    }
  }, [wishlist, user, value._id]);

const handleNavigateClick = (value) => {
 const url = `${value.name.toLowerCase().replaceAll(" ", "-")}+${value._id}`
  navigate(`/show-product-details/${url}`,
    {state : value}
  )
}
  
  return (
    <>
      <section className=" p-2 w-full h-auto md:w-[30%] lg:w-[17%] border-[1px] mx-auto mt-2 shadow-md border-gray-300 rounded-md"      onClick={(e) => handleNavigateClick(value)}>
        <FaHeart
          size={20}
          className={`relative left-[90%]   ${
            checkWishlist ? "text-red-600" : "text-gray-400"
          } `}
          onClick={(e) => handleHeartClick(value._id, value.name)}
        />
        <div className="w-auto max-h-[400px]">
          <img
            className="w-auto h-[200px] mx-auto"
            src={value?.image[0]}
            alt={value.name}
          />
        </div>
        <div className="w-full p-2">
          <p className="text-xl w-full font-semibold text-ellipsis line-clamp-3 mt-2 md:line-clamp-2 ">
            {value.name}
          </p>
          <p className="text-md  md:mt-2 font-bold text-green-600">
            <span className="font-bold text-md text-black">  Price : </span> ₹{value.price}
          </p>
          <p className="text-ellipsis line-clamp-3">{value.description}</p>
          <button className="m-4 px-2 py-1 bg-amber-400 text-white rounded-md ">Add to Cart</button>
        </div>
      </section>
    </>
  );
};

export default ProductInList;
