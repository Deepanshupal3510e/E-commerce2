import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useMobile from "../hooks/useMobile";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import { use } from "react";
import ProductsInDashboard from "../components/ProductsInDashboard";

const Products = () => {
  const isMobile = useMobile();
  const [showDashboard, setShowDashboard] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search , setSearch] = useState("");
  const fetchProducts = async () => {
    try {
      console.log("product fetching start...")
      const res = await Axios({
        ...summaryApi.searchProduct,
        data: {
          page,
          search : search
        },
      });
      setTotalPage(res.data.noOfPages);
      setData(res.data.data);
      console.log(res.data)
    } catch (error) {
      toast.error("Error while fetching products");
    }
  };

  const handleNextClick = () => {
      if(page == totalPage) {
       return setPage(1);
      }
    setPage(page + 1);
  }

  const handlePrevClick = () => {
    if(page === 1) {
     return setPage(totalPage);
    }
    setPage(page - 1);
  }

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  }
  const handleSearchClick = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  }
  useEffect(() => {
    fetchProducts();
  }, [page]);

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
            <p className="font-bold text-md md:text-2xl">Products </p>
            <form onSubmit={(e) => handleSearchClick(e)}>
            <input value={search} onChange={(e) => handleChangeSearch(e)} placeholder="Search products..." type="text" className="border-2 h-10 rounded-sm p-2 text-xl border-amber-300 outline-amber-200" />
            <button type="submit" className="p-2 bg">search</button>
            </form>
          
          </div>

          <button
            className={`${
              isMobile[0] ? "" : "hidden"
            } h-10 w-10 border-2 bg-gray-400 text-2xl flex justify-center z-10  items-center relative top-[-110px] rounded-md border-amber-50 left-2`}
            onClick={(e) => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? <IoCloseSharp /> : <RxHamburgerMenu />}
          </button>

          <section className="w-full p-3 flex gap-2 flex-wrap justify-evenly">
            {data.map((value) => {
              return <ProductsInDashboard key={value._id} value={value} />;
            })}
          </section>

          <div className="p-4 flex justify-center gap-2">
            <button onClick={handlePrevClick} className="p-1 px-2 text-yellow-400 rounded-sm border-2 border-amber-500 hover:text-white hover:bg-amber-400 duration-500">
              Prev
            </button>
            <span className="mt-1">{page}/{totalPage}</span>
            <button onClick={handleNextClick} className="p-1 px-2 text-yellow-400 rounded-sm border-2 border-amber-500 hover:text-white hover:bg-amber-400 duration-500">
              Next
            </button>
          </div>
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

export default Products;
