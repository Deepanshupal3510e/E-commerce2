import React, { useEffect, useState } from "react";
import { use } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import summaryApi from "../common/SummaryApi";
import { setUserDetails } from "../store/userDetails";
import toast from "react-hot-toast";
import Axios from "../utils/axios"

const PlaceOrder = ({change}) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  console.log(user.shopping_cart, "user");
  const [quantities , setQuantity] = useState({})
  const [totalPrice , setTotalPrice] = useState(0)
  const [showPayment , setShowpayment] = useState(false)
 
    const handleSelectChnage = (id , value , price) => {
        setQuantity((prev) => {
            return {...prev , [id]:Number(value)}
        })

    }
    console.log(quantities , "this is quantittes")
    useEffect(() => {
        const newTotal = user.shopping_cart.reduce((acc, item) => {
          const quantity = quantities[item._id] || 1;
          return acc + item.price * quantity;
        }, 0);
        setTotalPrice(newTotal);
      }, [quantities, user.shopping_cart]);
    

      
  return (
    <section className="w-full h-fit ">
         {
        showPayment ? <ShowPayment totalPrice={totalPrice} close={() => setShowpayment(false)} change={change} /> : ""
      }
      <p className="w-full text-center text-2xl mt-6 mb-4 font-bold">
        Place Order
      </p>

      <div>
        {user.shopping_cart.map((value) => {
            const quantity = quantities[value._id] || 1;
          return (
            <div
              key={value._id}
              className="md:flex justify-evenly items-center shadow-md mt-6 gap-4 pb-10"
            >
              <img className="h-30 w-auto mx-auto" src={value.image[0]} alt="" />
              <p className="w-[80%] md:w-[40%] line-clamp-2 text-center mx-auto mt-2 mb-3">{value.name}</p>
              <div className=" inline-block w-20 h-10 border-[1px] rounded-md bg-gray-200 ml-6 pt-[10px] pl-[2%] md:pl-0 md:pt-0  font-bold md:flex justify-center items-center text-sm outline-0 focus:outline-0 outline-gray-200 ">
                Oty <select className="focus:outline-0" name="quantity" id="quantity" onChange={(e) => handleSelectChnage(value._id , e.target.value , value.price)}>
                    <option  className="outline-0" value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </div>
              <p className="inline ml-[50%] md:ml-0 md:mr-3  ">₹ {value.price * Number(quantity)}</p>
              
            </div>
            
          );
        })}
      </div>
     
        <p className="p-6 font-bold">Total Price : ₹{totalPrice}</p>
        <button onClick={() => setShowpayment(true)} className="w-[80%] h-10 text-white bg-green-700 rounded-md ml-[10%] border-0">Place order</button>
    </section>
  );
};

export default PlaceOrder;


const ShowPayment = ({close , totalPrice , change}) => {
    const [gst , setgst] = useState(Math.ceil(Math.random() * 10));
    const [delivery , setDelivery] = useState(Math.ceil(Math.random() * 10))
    const user = useSelector(state => state.user)
    const [grandTotal , setGrandTotal] = useState(0)
    const dispatch = useDispatch()

        useEffect(() => {
                let gstPrice = (totalPrice * gst)/100;
                setGrandTotal(gstPrice + totalPrice + delivery)
        },[])

        const placeOrder = async () => {
          const data = {
            userId : user._id,
            paymentStatus : "pending",
            totalPrice : grandTotal,
            otherDetails : [],
            products : user.shopping_cart,
            orderId : uuidv4()
          }
          console.log(data , "this is data")
            const res = await Axios({
              ...summaryApi.placeOrder,
              data
            });
            if(res.data.success){
              close();
              dispatch(setUserDetails(res.data.data))
              toast.success(res.data.message)
              change();
            }
        }

        const handleCashOnDelivery =  () => {
            placeOrder();
        }
    return(
        <>
            <section className="absolute top-0 left-0 z-50 h-screen w-full bg-neutral-400 bg-opacity-50 flex justify-center items-center">
                    <div className="w-[80%] md:w-[30%] h-[50%] bg-white rounded-md">
                    <RxCross2 onClick={close} size={20} className="relative left-[90%] top-5 mb-6" />
                            <p className="text-xl font-bold text-center mt-6 mb-6">Payment Details</p>
                        <div className="w-[90%] ml-[5%] flex justify-between items-center mt-2">
                            <p className="font-bold ">Total price :</p>
                            <p>₹{totalPrice}</p>
                        </div>
                        <div className="w-[90%] ml-[5%] flex justify-between items-center mt-2">
                            <p className="font-bold ">GST :</p>
                            <p>{gst}%</p>
                        </div>
                        <div className="w-[90%] ml-[5%] flex justify-between items-center mt-2">
                            <p className="font-bold ">Delivery charges :</p>
                            <p>₹{delivery}</p>
                        </div>
                        <div className="w-[90%] ml-[5%] flex justify-between items-center mt-2">
                            <p className="font-bold ">Grand Total :</p>
                            <p className="font-bold">₹{grandTotal}</p>
                        </div>
                        <div>
                            
                        </div>
                            <button onClick={handleCashOnDelivery} className="w-[80%] ml-[10%] mt-6 text-green-500 border-green-500 rounded-md border-2 h-10">Case on delivery</button>
                            <button className="w-[80%] ml-[10%] mt-3 text-white  bg-green-500 rounded-md border-2 h-10">Online payment</button>
                    </div>
            </section> 
        </>
    )
}