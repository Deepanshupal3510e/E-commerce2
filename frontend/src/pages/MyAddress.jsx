import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddAddress from "../components/AddAddress";
import { useEffect } from "react";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";

const MyAddress = () => {
  const isMobile = useMobile();
  const user = useSelector(state => state.user)
  const [showDashboard, setShowDashboard] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showAddAddress , setShowAddAddress] = useState(false)

  const [address , setAddress] = useState(user.address_details)




  const fetchAddress = async () => {
    console.log("requested")
    const res = await Axios({
      ...summaryApi.getAddress,
    })
    if(res.data.success){
      dispatch(setAddress(res.data.data))
    }
  }

  useEffect(() => {
    fetchAddress();
  },[])
  return (
    <>
      <section className={`flex min-h-full mt-6 `}>
        <section
          className={`w-[20%]  min-h-full ${isMobile[0] ? "hidden" : "block"}`}
        >
          <Dashboard />
        </section>
        <section className={`w-full border-[2px] border-amber-100 rounded-md h-screen`}>


       
              <div className="flex shadow-md w-[100%] justify-between px-3 mt-2 items-center pb-3"> 
                <p className="font-bold text-md md:text-2xl">My Address</p>
                <button onClick={() => setShowAddAddress(!showAddAddress)} className="p-2 bg-amber-400 text-white hover:bg-amber-500 duration-300 rounded-xl">Add Address</button>
              </div>




          <button
            className={`${
              isMobile[0] ? "" : "hidden"
            } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center relative top-[-110px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>
            
            {
              showAddAddress ? <AddAddress close={() => setShowAddAddress(!showAddAddress)} /> : ""
            }

            {
              address?.map((value) => {
                console.log(value , "value")
                  return(
                    <div key={value._id} className="w-[90%] h-fit shadow-md mx-auto mt-6 p-10">
                      <p className="md:text-xl "><span className="font-bold md:text-xl">House No :- </span>{value.houseNo}</p>
                      <p className="md:text-md"><span  className="font-bold md:text-xl">Address :- </span>{value.roadNo},{value.landmark}</p>
                      <p className="md:text-md md:pl-[10%]"><span  className="font-bold text-xl"></span>{value.district},{value.state}</p>
                      <p className="md:text-md"><span  className="font-bold md:text-xl">Pin Code :- </span>{value.zipcode}</p>
                    </div>

                  )
              })
            }
           
        </section>
      </section>

      <section
        className={`fixed top-34 left-[-300px] md:hidden lg:hidden duration-700 bg-white  rounded-lg${isMobile[0] ? "" : "hidden"
          } ${showDashboard ? "left-[0px]" : "left-[-300px]"}`}
      >
        <Dashboard />
      </section>
    </>
  );
};

export default MyAddress;
