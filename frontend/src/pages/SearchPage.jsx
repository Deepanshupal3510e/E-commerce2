import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProductInList from '../components/ProductInList';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/axios';
import summaryApi from '../common/SummaryApi';
import { setUserDetails } from '../store/userDetails';
import toast from 'react-hot-toast';

const SearchPage = () => {
  const data = useSelector(state => state.products.searchProduct);
  const [product , setProduct]= useState(data)
  useEffect(() => {
    setProduct(data)
  },[data])

  // const dispatch = useDispatch();
  // const navigate = useNavigate()
  // const [checkWishlist, setCheckWishlist] = useState(false);
  // const wishlist = user.wishlist;

  // const handleHeartClick = async (id, name) => {
  //   console.log(value, user._id, "this is product details");
  //   if(checkWishlist){
  //     try {
  //       const res = await Axios({
  //         ...summaryApi.removeFromWishlist,
  //         data : {
  //           id : user._id,
  //           product : value
  //         }
  //       })
  //       if(res.data.success){
  //         dispatch(setUserDetails(res.data.data))
  //         toast.success(res.data.message)
  //         setCheckWishlist(false)
  //       }
  //     } catch (error) {
  //         console.log(error , "error while removing product from wishlist")
  //     }


  //   } else {
  //     try {
  //       const res = await Axios({
  //         ...summaryApi.addToWishlist,
  //         data: {
  //           userId: user._id,
  //           product: value,
  //         },
  //       });
  //       if (res.data.success) {
  //         toast.success(res.data.message);
  //         dispatch(setUserDetails(res.data.data))
  //       }
  //       if (res.data.error) {
  //         toast.error(res.data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (wishlist?.some((item) => item._id === value._id)) {
  //     setCheckWishlist(true);
  //   }
  // }, [wishlist, user, value._id]);


  // const handleNavigateClick = (value) => {
  //   const url = value.name.toLowerCase().replaceAll(" " , "-")+value._id.replaceAll("  " , "-")
  //   navigate(`/show-product-details/${url}` , {
  //     state : value,
  //   })
  // }



  return (
    <section className='w-full h-auto '>
          <div className='flex flex-wrap gap-4'>
              {
                product.map((value) => {
                  console.log(value , " this is data")
                  return (
                    <ProductInList key={value._id} value={value} />
                  )
                })
              }
          </div>
    </section>
  )
}

export default SearchPage
