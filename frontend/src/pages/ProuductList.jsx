import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import summaryApi from "../common/SummaryApi";
import Axios from "../utils/axios";
import NoData from "../components/NoData";
import ProductInList from "../components/ProductInList";

const ProuductList = () => {
  const location = useLocation();
  const Navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const fetchCategory = async () => {
    try {
      const url = location;
      console.log(url.state.id);
      const res = await Axios({
        ...summaryApi.getProductByCategory,
        data: {
          id: url.state.id,
        },
      });
      if (res.data.success) {

        const product = res.data.data
        let newOrder = product.map((_, index) => index).sort(() => Math.random() - 0.5);
        let reIndexValue = newOrder.map(i => product[i]);

        reIndexValue.map((value , index) => {
          if(index < 15){
            setProducts((prev) => {
              return [...prev , value]
            })
          }
        })
      }
      if (res.data.error) {
        toast.error(res.data.message);
      }
      console.log(products.length, "products");
    } catch (error) {
      console.log(error, "error while fetching product by category");
      toast.error(error);
    }
  };



  useEffect(() => {
    fetchCategory();
  }, [location]);

  if (products.length == 0) {
    return (
      <section className="w-full h-[80%]">
        <NoData />{" "}
        <div className="w-full flex justify-center">
          <button className="p-4 border-1 outline-0" onClick={() => Navigate("/search")}>Search More </button>
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full h-auto mt-4 p-6 ">
        <div className="flex justify-evenly gap-4 flex-wrap">
            {
                products.map((value) => {
                    return <ProductInList key={value._id} value={value} />
                })
            }
        </div>
        <div className="w-full flex justify-center">
          <button className="p-4 border-1 outline-0 mt-6" onClick={() => Navigate("/search")}>Search More </button>
        </div>
      </section>
    );
  }
};

export default ProuductList;
