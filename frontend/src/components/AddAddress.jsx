import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../store/userDetails";

const AddAddress = ({ close }) => {
  const user = useSelector((state) => state.user);
  
  const dispatch = useDispatch()
  const [details, setDetails] = useState({
    houseNo: "",
    roadNo: "",
    landmark: "",
    number: "",
    state: "",
    district: "",
    userId: "",
    zipcode: "",
  });




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFomrSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios({
      ...summaryApi.addAddress,
      data: details,
    });

    if (res.data.error) {
      toast.error(res.data.message);
    }

    if (res.data.success) {
      toast.success(res.data.message);
      setDetails({
        houseNo: "",
        roadNo: "",
        landmark: "",
        number: "",
        state: "",
        district: "",
        userId: "",
      });
      close();
      dispatch(setAddress(res.data.data))
      console.log(res.data.data);
    }
  };

  useEffect(() => {
    setDetails((prev) => {
      return { ...prev, userId: user._id };
    });
  }, [user]);

  return (
    <section className="w-[90%] md:w-[50%] bg-white shadow-md mx-auto mt-6">
      <IoMdClose
        size={25}
        className="relative left-[90%]  top-4 hover:text-red-600"
        onClick={close}
      />
      <h1 className="mt-6 text-2xl font-bold text-center pb-10">Add Address</h1>

      <label className="w-[80%] mx-auto block pl-3 mt-4" htmlFor="houseNo">
        Enter your house number
      </label>
      <input
        type="text"
        name="houseNo"
        value={details.houseNo}
        onChange={(e) => handleInputChange(e)}
        id="houseNo"
        className="w-[80%] h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
      />

      <label className="w-[80%] mx-auto block pl-3 mt-4" htmlFor="roadNo">
        Enter Road name
      </label>
      <input
        type="text"
        id="roadNo"
        name="roadNo"
        value={details.roadNo}
        onChange={(e) => handleInputChange(e)}
        className="w-[80%] h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
      />

      <label className="w-[80%] mx-auto block pl-3 mt-4" htmlFor="landmark">
        Enter landmark location
      </label>
      <input
        type="text"
        id="landmark"
        name="landmark"
        value={details.landmark}
        onChange={(e) => handleInputChange(e)}
        className="w-[80%] h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
      />

      <div className="w-[80%] mx-auto mt-4 flex justify-between">
        <div>
          <label  className="w-full mx-auto block pl-3 mt-4" htmlFor="Number">
            Enter your phone no.
          </label>
          <input
            type="phone"
            id="Number"
            name="number"
            value={details.number}
            onChange={(e) => handleInputChange(e)}
            className="w-[80%] h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
          />
        </div>
        <div>
        <label  className="w-full mx-auto block pl-3 mt-4" htmlFor="zipcode">
            Enter zipcode
          </label>
          <input
            type="phone"
            id="zipcode"
            name="zipcode"
            value={details.zipcode}
            onChange={(e) => handleInputChange(e)}
            className="w-[80%] h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
          />
        </div>
      </div>

      <div className="w-[80%] mx-auto mt-4 flex justify-between">
        <div>
          <label className="w-full mx-auto block pl-3 mt-4" htmlFor="state">
            Enter state
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={details.state}
            onChange={(e) => handleInputChange(e)}
            className="w-full h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
          />
        </div>
        <div>
          <label className="w-full mx-auto block pl-3 mt-4" htmlFor="district">
            Enter district
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={details.district}
            onChange={(e) => handleInputChange(e)}
            className="w-full h-10 outline-none rounded-md pl-1 bg-gray-300 block mx-auto mt-2"
          />
        </div>
      </div>
      <button
        onClick={(e) => handleFomrSubmit(e)}
        className="w-[80%] ml-[10%] h-10 bg-blue-600 text-white rounded-md m-5"
      >
        Add
      </button>
    </section>
  );
};

export default AddAddress;
