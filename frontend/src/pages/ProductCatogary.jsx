import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CreateCatogary from "../components/CreateCatogary";
import summaryApi from "../common/SummaryApi";
import Axios from "../utils/axios";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import EditCatogary from "../components/EditCatogary";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../components/NoData";

const ProductCatogary = () => {
  const isMobile = useMobile();
  const [showCatogary, setShowCatogary] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [create, setCreate] = useState(false);
  const [editCatogaryData, SeteditCatogaryData] = useState();
  const [showDeleteCatogary, setShowDeleteCatogary] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const catagory = useSelector(state => state.products.catogary)

  
const DeleteCatogary = (props) => {
  const { _id, name, image } = props.value;

 console.log(_id)

  const handleDeleteClick = async (e) => {
        e.preventDefault()
    try {
      const result = await Axios({
        ...summaryApi.deleteCatogary,
        data : props.value
      })
      if(result.data.error){
        toast.error(result.data.message)
        console.log(result)
      }
      if(result.data.success){
        toast.success(result.data.message);
        console.log(result)
        props.close();
      }
    } catch (error) {
        console.log(error)
    }
   

  }
  return (
    <>
      <section className="w-full h-full z-50 bg-neutral-500 opacity-95 flex justify-center items-center absolute top-0 left-0">
        <form className="w-[90%] md:w-[50%] bg-white shadow-md rounded-xl flex justify-center items-center flex-col gap-4">
        <h1 className="mt-6 text-2xl font-bold">Are you sure to Delete this Catogary</h1>
          <div>
            

            <div className="h-40 w-40 bg-gray-200 rounded-md flex justify-center items-center flex-col">
              <img className="h-30 w-30 m-2" src={image} alt="" />
              <p className="text-center m-1">{name}</p>
            </div>



            <div className="flex justify-between mt-4 mb-6">
              <button onClick={props.close} className="p-3 bg-blue-600 text-white rounded-md">
                Cencel
              </button>
              <button  onClick={(e) => handleDeleteClick(e)} className="p-3 bg-red-500 text-white rounded-md">
                Delete
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};


  return (
    <>
      <section className={`flex h-fit  mt-6 `}>
        <section className={`w-[20%]   ${isMobile[0] ? "hidden" : "block"}`}>
          <Dashboard />
        </section>
        <section
          className={`w-full h-fit  border-[2px] border-amber-100 rounded-md pb-4`}
        >
          <button
            className={`${isMobile[0] ? "" : "hidden"
              } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center fixed top-[55px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>

          <div className="flex shadow-md w-[100%] justify-between px-3 mt-2 items-center pb-3">
            <p className="font-bold text-md md:text-2xl">Product Catogary </p>
            <button
              className="p-2 text-amber-400 border-amber-400 border-2 hover:bg-amber-500 hover:text-white duration-300 rounded-sm "
              onClick={() => setCreate(!create)}
            >
              {create ? "close" : "Add Catagory"}
            </button>
          </div>

          {create ? (
            <CreateCatogary
              value={catagory}
              close={() => setCreate(!create)}
            />
          ) : (
            ""
          )}

          {showCatogary ? (
            <EditCatogary
              close={() => setShowCatogary(false)}
              value={editCatogaryData}
            />
          ) : (
            ""
          )}
          {showDeleteCatogary ? (
            <DeleteCatogary
              close={() => setShowDeleteCatogary(false)}
              value={editCatogaryData}
            />
          ) : (
            ""
          )}
          <section className="w-full px-6 flex  flex-wrap justify-evenly mt-6 flex-start gap-5">
            {catagory.map((value, index) => {
              return (
                <div
                  key={value._id}
                  className="w-34 h-auto  rounded-md shadow-xl mb-1 mt-4"
                >
                  <img
                    className="h-30 w-30 mt-2 ml-2  "
                    src={value.image}
                    alt={value.name}
                  />
                  <p className="text-center ">{value.name}</p>
                  <div className="flex justify-between mt-1 px-4 mb-3">
                    <TbEdit
                      onClick={() => {
                        setShowCatogary(true), SeteditCatogaryData(value);
                      }}
                      className="text-3xl bg-green-400 p-2 rounded-md"
                    />
                    <MdDelete
                      onClick={() => {
                        setShowDeleteCatogary(!showDeleteCatogary),
                          SeteditCatogaryData(value);
                      }}
                      className="text-3xl bg-red-400 p-2 rounded-md"
                    />
                  </div>
                </div>
              );
            })}
            {catagory.length == 0 ? <NoData /> : ""}
          </section>
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

export default ProductCatogary;
