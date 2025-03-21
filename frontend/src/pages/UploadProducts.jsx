import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import { useSelector } from "react-redux";

const UploadProducts = () => {
  const isMobile = useMobile();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const product = useSelector((state) => state.products.product);

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
            <p className="font-bold text-md md:text-2xl">Upload product </p>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="p-2 bg-amber-400 text-white hover:bg-amber-500 duration-300 rounded-xl"
            >
              Upload Product
            </button>
          </div>

          <button
            className={`${
              isMobile[0] ? "" : "hidden"
            } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center relative top-[-110px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>

          {showAddProduct ? (
            <AddProduct close={() => setShowAddProduct(!showAddProduct)} />
          ) : (
            ""
          )}

         
        </section>
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

export default UploadProducts;
