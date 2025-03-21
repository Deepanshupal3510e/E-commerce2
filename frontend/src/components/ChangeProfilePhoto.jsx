import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/axios";
import { setUserDetails, updateAvtar } from "../store/userDetails";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import Loader from "./Loader";
import fetchUserDetails from "../utils/fetchUserDetails";

const ChangeProfilePhoto = () => {
  const [change, setChange] = useState(false);
  const [loading , setloading] = useState(false)
  const [url, seturl] = useState("");
  const [userImage, setUserImage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleChangeClick = (e) => {
    console.log("handle Change clicked");
    setChange(!change);
  };

  const handleFileChange = async (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avtar", file);
    setUserImage(formData);
    const imageUrl = URL.createObjectURL(file);
    seturl(imageUrl);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!userImage){
       return toast.error("please select a image")
    }
    setloading(true)
    console.log("image upload requested");
    const res = await Axios({
      ...summaryApi.uploadAvtar,
      data: userImage,
    });
    console.log(res, "res handle file change");
    if (res.data.success) {
      dispatch(updateAvtar(userImage));
      toast.success("profile picture uploaded succesfully");
      setChange(false);
      setloading(false)
     const newData  = await fetchUserDetails();
     dispatch(setUserDetails(newData.data))
    }
  };

  if (change) {
      return (
        <>
          <div
            // onClick={(e) => handleChangeClick(e)}
            className="h-screen w-screen absolute top-0 left-0 z-2 bg-opacity-80 flex justify-center items-center bg-neutral-800"
          >
           {loading ? (<Loader/>) : ( <form
              className="w-[60%] md:w-[30%] h-[30vh] bg-white shadow-md rounded-lg z-10 "
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <button  onClick={(e) => handleChangeClick(e)} type="button" className=" h-10 w-10 border-0 p-2 bg-blue-600 text-white text-center relative left-[4%] top-[4%] rounded-md">
              <RxCross1 className="h-full w-full " />
              </button>
              <div className="flex flex-col items-center justify-center">
                <input
                  onChange={(e) => handleFileChange(e)}
                  type="file"
                  id="avtar"
                  accept="image/*"
                  className="hidden"
                />
                <img
                  className="h-14 w-14 rounded-full md:mt-6"
                  src={url ? url : user.avtar}
                  alt=""
                />
                <div className="w-full flex justify-evenly md:justify-center gap-3">
                  <label
                    htmlFor="avtar"
                    className="text-white bg-amber-300 rounded-lg p-2 mt-6"
                  >
                    choose file
                  </label>
                  <input
                    type="submit"
                    className="text-white bg-amber-300 rounded-lg p-2 mt-6"
                  />
                </div>
              </div>
            </form>)}
            
          </div>
        </>
      );
    
  } else {
    return (
      <>
        <button
          className="bg-amber-300 rounded-sm text-white p-2 text-sm"
          onClick={(e) => handleChangeClick(e)}
        >
          Upload Photo
        </button>
      </>
    );
  }
}

export default ChangeProfilePhoto;
