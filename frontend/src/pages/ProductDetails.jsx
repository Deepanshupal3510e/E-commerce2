// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import ProductSlider from "../components/CardInHome";
// import Axios from "../utils/axios";
// import summaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";
// import { setUserDetails } from "../store/userDetails";

// const ProductDetails = () => {
//   const location = useLocation();
//   const dispatch = useDispatch()
//   const [data, setData] = useState(location.state);
//   const user = useSelector(state => state.user)
//   const category = useSelector((state) => state.products.catogary);
//   const [categoryName, setCategoryName] = useState([]);
//   const [image, setImage] = useState("");
//   const Navigate = useNavigate()

//   useEffect(() => {
//     category?.map((value) => {
//       data?.category.map((some) => {
//         if (some === value._id) {
         
//           setCategoryName((prev) => {
//             return [...prev, value.name];
//           });
//         }
//       });
//     });
//   }, [data, category]);

//   const handleCartClick = async (data) => {
//     if(!user.name){
//         Navigate("/login")
//     }
//     const res = await Axios({
//         ...summaryApi.addToCart,
//         data : {
//             userId : user._id,
//             product : data
//         }
//     })
//         if(res.data.success){
//           toast.success(res.data.message)
//           console.log(res.data.data, "user Data")
//           dispatch(setUserDetails(res.data.data))
//         }
//   } 

 
//   return (
//     <section className="w-full md:flex h-auto">
//       <div className="w-full md:w-[40%] p-10 flex justify-center items-center flex-col">
//         <img
//           src={image ? image : data.image[0]}
//           alt={data.name}
//           className="h-100 w-auto rounded-md"
//         />
//         <div className="flex w-[80%] mt-4 flex-wrap gap-3 ">
//           {data.image.map((value) => {
//             return (
//               <img
//                 onClick={() => setImage(value)}
//                 className="w-auto h-10 border-2 rounded-md"
//                 key={value}
//                 src={value}
//                 alt={value}
//               />
//             );
//           })}
//         </div>
//       </div>
//       <div className="md:w-[60%] p-3 pl-10 md:p-14 flex flex-col gap-3">
//         <p className="font-bold text-2xl">{data.name}</p>
//         <p className=" text-xl text-gray-600">
//           Price : ₹{" "}
//           <span className="font-normal line-through">{data.price}</span>
//         </p>
//         <p className="text-xl font-bold">
//           Final Price : {data.discount ? data.discount : "0"}%
//           <span className="text-sm">(off)</span>{" "}
//           {data.price - data.price * (data.discount / 100)}{" "}
//           <span className="font-normal text-sm">
//             ({data.price * (data.discount / 100)}) ₹saved
//           </span>
//         </p>
//         <p key={Math.random()}>
//           Category :{" "}
//           {categoryName.map((categoryName) => (
//             <span>{categoryName},</span>
//           ))}
//         </p>
//         {Object.entries(data?.more_details).map(([key, value]) => (
//           <p key={key + Math.random()}>{key} : {value}</p>
//         ))}
//          <button onClick={(e) => handleCartClick(data)} className="px-2 py-1 bg-amber-400 text-white rounded-md w-fit">Add to Cart</button>
//         <p className="w-[80%] "><span className="text-md font-bold">Description :- </span>{data.description}</p>
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userDetails";

const ProductDetails = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [data, setData] = useState(location.state || null);
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state.products.catogary || []);
  
  const [categoryNames, setCategoryNames] = useState([]);
  const [image, setImage] = useState("");

  // Redirect if no product data is available
  useEffect(() => {
    if (!data) {
      Navigate("/");
      return;
    }

    console.log(location.state)
    // Set default image if available
    if (data?.image?.length > 0) {
      setImage(data.image[0]);
    }

    // Extract category names efficiently
    const matchedCategories = category
      .filter((cat) => data.category.includes(cat._id))
      .map((cat) => cat.name);

    setCategoryNames(matchedCategories);
  }, [data, category, Navigate]);

  const handleCartClick = async () => {
    if (!user?.name) {
      return Navigate("/login");
    }

    try {
      const res = await Axios({
        ...summaryApi.addToCart,
        data: {
          userId: user._id,
          product: data,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUserDetails(res.data.data));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  if (!data) return null; // Prevents rendering before data is available

  return (
    <section className="w-full md:flex h-auto">
      <div className="w-full md:w-[40%] p-10 flex justify-center items-center flex-col">
        <img
          src={image || (data.image?.length > 0 ? data.image[0] : "/placeholder.png")}
          alt={data?.name || "Product Image"}
          className="h-100 w-auto rounded-md"
        />
        <div className="flex w-[80%] mt-4 flex-wrap gap-3">
          {data?.image?.map((value, index) => (
            <img
              onClick={() => setImage(value)}
              className="w-auto h-10 border-2 rounded-md cursor-pointer"
              key={index}
              src={value}
              alt={`Thumbnail ${index}`}
            />
          ))}
        </div>
      </div>
      <div className="md:w-[60%] p-3 pl-10 md:p-14 flex flex-col gap-3">
        <p className="font-bold text-2xl">{data.name}</p>
        <p className="text-xl text-gray-600">
          Price: ₹ <span className="font-normal line-through">{data.price}</span>
        </p>
        <p className="text-xl font-bold">
          Final Price: {data.discount ? `${data.discount}%` : "0%"} <span className="text-sm">(off)</span>{" "}
          {(data.price - data.price * (data.discount / 100)).toFixed(2)} ₹
          <span className="font-normal text-sm">
            ({(data.price * (data.discount / 100)).toFixed(2)} ₹ saved)
          </span>
        </p>
        <p>
          Category:{" "}
          {categoryNames.length > 0 ? categoryNames.join(", ") : "N/A"}
        </p>
        {data?.more_details &&
          Object.entries(data.more_details).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        <button
          onClick={handleCartClick}
          className="px-2 py-1 bg-amber-400 text-white rounded-md w-fit"
        >
          Add to Cart
        </button>
        <p className="w-[80%]">
          <span className="text-md font-bold">Description: </span>
          {data.description || "No description available."}
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
