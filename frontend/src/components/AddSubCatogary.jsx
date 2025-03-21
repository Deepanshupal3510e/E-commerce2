import React, { useState } from "react";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import { use } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSubCategory } from '../store/product';

const AddSubCatogary = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const catagory = useSelector((state) => state.products.catogary);

  const [data, setData] = useState({
    name: "",
    image: "",
    catogary: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("file not selected");
      toast.error("no image selected");
    } else {
      setLoading(true);
      const res = await uploadImage(file);

      console.log(res.data.data.url);

      setData((prev) => {
        return {
          ...prev,
          image: res.data.data.url,
        };
      });
      console.log(data);
      setLoading(false);
    }
  };

  const AddSubCatogary = async (e) => {
    e.preventDefault();
  console.log(data , "this is data")
  
    try {
      const response = await Axios({
        ...summaryApi.addSubCategory,
        data,
      });
      console.log(response);
      if(response.data.error) {
        toast.error(response.data.message)
      }
      if(response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          image: "",
          catogary : [],
        });
        props.get()
        props.close()
        getSubCategory()
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getSubCategory = async () => {
    try {
        const res = await Axios({
          ...summaryApi.getSubCategory
        })

        dispatch(setSubCategory(res.data.data))
    } catch (error) {
      
    }
  }

    const handleDeleteClick = (id) => {
        setData((prev) => ({
            ...prev,
            catogary: prev.catogary.filter((value) => value._id !== id),
        }));
    }

  return (
    <section className=" fixed w-full h-full top-0 right-0 flex justify-center items-center bg-neutral-500 opacity-90 z-50">
      <form
        onSubmit={(e) => AddSubCatogary(e)}
        className="w-[90%] p-6  md:w-[70%] bg-gray-200 rounded-md shadow-xl "
      >
        <div className="flex justify-between px-3">
          <p className="text-xl md:text-2xl">Create Catogary</p>
          <RxCross2
            size={20}
            className="block cursor-pointer "
            onClick={props.close}
          />
        </div>
        <label htmlFor="name" className="text-md font-bold mt-2 block">
          {" "}
          Catogary name
        </label>
        <input
          name="name"
          value={data.name}
          onChange={(e) => handleInputChange(e)}
          type="text"
          id="name"
          className="w-[80%] h-10 pl-2 text-md bg-gray-300 mt-2 rounded-lg"
          placeholder="Enter Catogary name"
        />
        <p className="text-md font-bold mt-2">Upload image</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-[90%] h-60 md:h-40 md:w-40 bg-gray-300 mt-2 rounded-sm flex justify-center items-center">
            {data.image ? (
              <img src={data.image} className="w-full h-full object cover" />
            ) : (
              "no image"
            )}
          </div>
          <input
            disabled={!data.name}
            onChange={(e) => handleImageUpload(e)}
            type="file"
            id="ChooseFile"
            className="hidden "
          />
          <label
            disabled={data.name && data.image ? false : true}
            htmlFor="ChooseFile"
            className={`p-2 ${
              data.name ? "bg-amber-300 " : "bg-gray-500"
            }  rounded-md`}
          >
            {loading ? "Loading..." : "Choose image"}
          </label>
        </div>

           <div className="w-[90%] h-auto p-2 mt-4 ml-4 flex gap3">
            {
                data?.catogary?.map((value , index) => {
                    return <div key={index} className="bg-green-400 p-2 rounded-md text-[10px] ml-1 text-white flex items-center">{value?.name} <RxCross2 size={18} onClick={() => handleDeleteClick(value._id)} /></div>
                })
            }
           </div>
        <select
          onChange={(e) => {
            const value = e.target.value;
            console.log(value , "value")
            const selectedCatogary = catagory.find((element) => element._id == value);
            
            setData((prev) => {
                return {...prev,
                    catogary : [...prev.catogary , selectedCatogary]
                }
            })
          }}
          className="w-[90%] ml-5 mt-1 rounded-lg p-3 border-2"
        >
            <option value="" >
                Select Categories
            </option>
          {catagory.map((value) => {
            return <option key={value?._id}  value={value?._id}>{value?.name}</option>;
          })}
        </select>
        <button
          type="submit"
          disabled={data.name && data.image ? "" : "true"}
          className={` ${
            data.name && data.image ? " bg-amber-300" : "bg-gray-600"
          } w-[80%] h-10 rounded-md mt-4 ml-[10%]`}
        >
          {" "}
          {loading ? "Loading..." : "Add sub Catogary"}
        </button>
      </form>
    </section>
  );
};

export default AddSubCatogary;
