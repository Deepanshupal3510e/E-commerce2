import { useDispatch, useSelector } from "react-redux";
import Sliders from "../components/Slider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import ProductSlider from "../components/CardInHome";
import ShowVerify from "./ShowVerify";
import { setUserDetails } from "../store/userDetails";

const Home = () => {
  const category = useSelector((state) => state.products.catogary) || [];
  const dispatch = useDispatch();
  const [verfiyEmail, setVerifyEmail] = useState(true)
  const subCategory = useSelector((state) => state.products.subCatogary);
  const [showCategoryData, setShowCategoryData] = useState([]);
  const [firstData, setFirstData] = useState([]);

  const navigate = useNavigate();

  let newOrder = category
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5);
  let reIndexCategoryArray = newOrder.map((i) => category[i]);

  const handleCategoryClick = (id, name) => {
    console.log(id, name);
    navigate(`/product-list/${name}-${id}`, {
      state: {
        id: id,
        name: name,
      },
    });
  };

   const getUserDetails = async () => {
      const res = await Axios({
        ...summaryApi.getUserDetails
      })
      dispatch(setUserDetails(res.data.data))
        setVerifyEmail(res.data.data.verify_email)
    }

  useEffect(() => {
    showCategoryData.map(async (value, index) => {
      const res = await Axios({
        ...summaryApi.getProductByCategory,
        data: {
          id: value._id,
        },
      });
      if (res.data.success) {
        await setFirstData((prev) => {
          return [...prev, res.data.data];
        });
      }
    });
  }, [showCategoryData]);

  useEffect(() => {
    let newOrder = category
      .map((_, index) => index)
      .sort(() => Math.random() - 0.5);
    let reIndexCategoryArray = newOrder.map((i) => category[i]);
    reIndexCategoryArray.map((value, index) => {
      if (index <= 4) {
        setShowCategoryData((prev) => {
          return [...prev, value];
        });
      }
    });
  }, [category]);


  useEffect(() => {
    getUserDetails()
  },[])

  return (
    <>
      <section>
         {verfiyEmail ? " " : <ShowVerify />}
        <Sliders />
        <section className="w-full h-auto ">
          <p className="w-full px-10   mt-4 font-bold text-xl">
            Product category
          </p>
          <div className="w-[90%] h-auto mx-auto flex flex-wrap justify-evenly items-center gap-4 shadow-md pb-4 mt-4">
            {reIndexCategoryArray.map((value, index) => (
              <div
                key={index}
                className="w-20 h-20 md:w-24 md:h-24  mt-2  rounded-md flex justify-center gap-2 flex-col items-center cursor-pointer"
                onClick={(e) => handleCategoryClick(value._id, value.name)}
              >
                <img
                  className="w-12 h-12 md:w-20 md:h-20"
                  src={value.image}
                  alt=""
                />
                <p>{value.name}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="w-full h-auto ">
        {
          firstData.map((value , index) => {
            return (
              <div key={index} className="w-full h-auto mt-10 shadow-md">
                <p className="w-[90%] mx-auto font-bold text-2xl">{showCategoryData[index]?.name}</p>
                <div className="w-[90%] mx-auto h-auto mt-4">
                  <ProductSlider   value={value} />
                </div>
                  
              </div>
            )
          })
        }
           
      </section>
     
    </>
  );
};

export default Home;
