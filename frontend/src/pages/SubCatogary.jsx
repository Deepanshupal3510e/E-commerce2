import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddSubCatogary from "../components/AddSubCatogary";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/axios";
import { setSubCategory } from "../store/product";
import toast from "react-hot-toast";
import summaryApi from "../common/SummaryApi";
import { MdDelete, MdModeEdit } from "react-icons/md";
import EditSubCatogary from "../components/EditSubCatogary";
import NoData from "../components/NoData";

const SubCatogary = () => {
  const isMobile = useMobile();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAddSubCatogary, setShowAddSubCatogary] = useState(false);
  const category = useSelector((state) => state.products.catogary);
  const [subCategory, setSubCategory] = useState([]);
  const [edit, setEdit] = useState(false);
  const [deletes , setDelete] = useState({
    state : false,
    _id : ""
  })
  
  const getSubCategory = async () => {
    try {
      const result = await Axios({
        ...summaryApi.getSubCategory,
      });
     
      if (result.data.success) {
        setSubCategory(result.data.data);
      }
      if (result.data.error) {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (value) => {
    console.log("edit clicked");
    setEdit(value);
  };

  const showDelete = (_id) => {
      setDelete({
        state : true,
        _id
      })
  }
  const deleteSubCategory =  async () => {
    try {
        const res = await Axios({
          ...summaryApi.removeSubCategory,
          data : {_id : deletes._id}
        })
        console.log(res)
        if(res.data.success){
          toast.success(res.data.message)
          setDelete({
            state : false,
            _id :""
          })
          getSubCategory()
        }
        if(res.data.error){
          toast.error(res.data.error)
          setDelete({
            state : false,
            _id :""
          })
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getSubCategory();
  }, []);
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
            <p className="font-bold text-md md:text-2xl">Sub Catogary </p>
            <button
              onClick={() => setShowAddSubCatogary(true)}
              className="p-2 bg-amber-400 text-white hover:bg-amber-500 duration-300 rounded-xl"
            >
              Add sub catogary
            </button>
          </div>

          {showAddSubCatogary && (
            <AddSubCatogary get={getSubCategory} close={() => setShowAddSubCatogary(false)} />
          )}

          <button
            className={`${
              isMobile[0] ? "" : "hidden"
            } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center relative top-[-110px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>

          {!subCategory.length == 0 ? (
            <table className="w-full p-6" border={1} cellPadding={0}>
              <thead>
                <tr className="w-full p-3 bg-blue-800 text-white flex border-2 mb-2">
                  <th className={`w-[10%]`}>Sr.</th>
                  <th className={`w-[20%]`}>Name</th>
                  <th className={`w-[20%]`}>Image</th>
                  <th className={`w-[40%]`}>Category</th>
                  <th className={`w-[20%]`}>Action</th>
                </tr>
              </thead>

              <tbody>
                {subCategory.map((value, index) => {
                  console.log(value , "value")
                  return (
                    <tr
                      key={value._id}
                      className="w-full shadow-md   mt-1 rounded-md flex"
                    >
                      <td
                        className={`w-[5%] h-auto flex items-center justify-center font-bold `}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`w-[25%] text-[10px] md:text-[15px] h-auto flex items-center pl-2 `}
                      >
                        {value.name}
                      </td>
                      <td
                        className={`w-[20%] h-auto flex items-center justify-center `}
                      >
                        <img
                          src={value.image}
                          className="w-[60%] h-[80%] mt-1"
                          alt=""
                        />
                      </td>

                      <td
                        className={`w-[50%] text-[10px] md:text-[15px] h-auto flex items-center justify-center `}
                      >
                        {value.category ? value.category.join(", ") : " "}
                      </td>
                      <td
                        className={`w-[10%] h-auto flex items-center justify-evenly `}
                      >
                        <MdModeEdit
                          onClick={() => handleEditClick(value)}
                          className="text-green-600 cursor-pointer"
                          size={20}
                        />
                        <MdDelete
                          className=" text-red-600 cursor-pointer"
                          onClick={() => showDelete(value._id)}
                          size={20}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </section>
        {edit ? (
          <EditSubCatogary fetch={getSubCategory} data={edit} close={() => setEdit(false)} />
        ) : (
          ""
        )}
        {
          deletes.state ? <section className="absolute left-0  top-0 w-full h-full z-50 bg-neutral-400 flex justify-center items-center">
            <div className="w-[70%] h-50 bg-white rounded-lg shadow-md">
              <p className="mt-6 text-center">Are you sure to delete this SubCategory</p>
              <div className="w-[30%] flex justify-between mx-4 mt-10 ml-[35%]">
                <button onClick={() => setDelete({state : "" , _id : ""})} className="p-3 bg-green-500 text-white rounded-md">Cencel</button>
                <button onClick={ () => deleteSubCategory(deletes._id)} className="p-3 bg-red-500  text-white rounded-md">Delete</button>
              </div>
            </div>
          </section> : ""
        }
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

export default SubCatogary;
