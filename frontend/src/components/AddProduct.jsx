import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../utils/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setProducts } from "../store/product";
import { use } from "react";

const AddProduct = (props) => {
  const [data, setData] = useState({
    name: "",
    price: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    discount: "",
    description: "",
    more_details: {},
    publish: "off",
  });
  
  const dispatch = useDispatch();
  const [fieldname, setFieldName] = useState("");
  const [showAddMore, setShowAddMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const category = useSelector((state) => state.products.catogary);
  const subCategory = useSelector((state) => state.products.subCatogary);

  const handleImageChange = async (e) => {
    console.log("image upload requested");
    const file = e.target.files[0];
    if (!file) {
      toast.error("no image selected");
      return;
    }
    setLoading(true);
    const result = await uploadImage(file);

    const { data: imageResponse } = result;
    console.log(result.data.data.url, "image upload result");
    setData((prev) => {
      setLoading(false);
      return {
        ...prev,
        image: [...prev.image, result.data.data.url],
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation()
    console.log(data, "data");
    const res = await Axios({
      ...summaryApi.addProduct,
      data,
    });
    console.log(res);

    if (res.data.success) {
      toast.success("Product Added Successfully");
      setTimeout(() => {
        props.close();
      },10000)
      setData({
        name: "",
        price: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        discount: "",
        description: "",
        more_details: {},
        publish: "off",
      });
      console.log(res.data.data)
      setUploaded(res.data.data);
      const getProducts = async () => {
        const res = await Axios({
          ...summaryApi.getProducts,
        });
        dispatch(setProducts(res.data.data));
      };
      getProducts();
    }

    if (res.data.error) {
      toast.error(res.data.message);
    }
  };

  const hanelAddFieldSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldname]: "",
        },
      };
    });
    setFieldName("");
    setShowAddMore(false);
  };
  if(uploaded) {
    return (
      <>
        <section className="p-4 w-full">
          <h1 className="text-center mt-4 text-2xl font-bold">Product Added</h1>
              <div className="flex w-[90%] h-auto p-4 m-auto bg-white rounded-md mt-10 ">
                <img className="h-20 w-20 md:h-30 md:w-30 shadow-md  rounded-md " src={uploaded?.image[0]} alt="" />
                <div className="w-auto h-auto ml-4 pl-2 md:pl-6">
                  <p className="w-full text-xl font-bold text-ellipsis line-clamp-1">{uploaded.name}</p>
                  <p className="text-md">₹{uploaded.price}</p>
                  <p className="text-md">Stock : {uploaded.stock}</p>
                  <p className="w-full h-auto text-sm text-ellipsis line-clamp-3 ">{uploaded.description}</p>
                </div>
              </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="w-full h-auto  bg-neutral-500 bg-opacity-50 z-50 flex justify-center items-center">
          <form
            className="w-[90%] md:w-[50%] h-auto bg-white rounded-md p-5 mt-20 mb-30"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <div className="w-full ">
              {" "}
              <button className="relative ml-[95%] top-2" onClick={props.close}>
                <RxCross2 size={25} />
              </button>
            </div>
            <h1 className="text-center w-full text-2xl mt-6 mb-10 font-bold">
              Add Product
            </h1>
            <label className=" w-[90%]  m-auto pl-4 block" htmlFor="Name">
              Enter the product name
            </label>
            <input
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2"
              type="text"
              id="Name"
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
            <label className=" w-[90%]  m-auto pl-4 block" htmlFor="price">
              Enter the product price
            </label>
            <input
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2 "
              type="number"
              id="price"
              name="price"
              onChange={(e) => handleInputChange(e)}
            />
            <p className="w-[90%]  m-auto pl-4 block">Select product images</p>

            <div
              className='w-[90%] m-auto h-30 flex  items-center bg-gray-400 mt-2 rounded-md overflow-x-scroll  [&::-webkit-scrollbar]:h-2
              [&::-webkit-scrollbar-track]:bg-green -100
               [&::-webkit-scrollbar-thumb]:bg-green-300
               dark:[&::-webkit-scrollbar-track]:bg-yellow-700
               dark:[&::-webkit-scrollbar-thumb]:bg-Yellow-500">'
            >
              {data.image.map((value, index) => {
                return (
                  <img
                    key={index + "image"}
                    className="h-24 w-24 rounded-md mx-2"
                    src={value}
                    alt=""
                  />
                );
              })}
              {loading ? (
                "loading..."
              ) : (
                <label
                  className="ml-6 w-[150px] flex flex-col justify-center items-center "
                  htmlFor="image"
                >
                  <IoMdCloudUpload size={40} />
                  <p className="w-100%">Upload Image</p>
                </label>
              )}
            </div>
            <input
              className="hidden"
              type="file"
              id="image"
              onChange={(e) => handleImageChange(e)}
            />

            <label className=" w-[90%]  m-auto pl-4 block" htmlFor="category">
              Select the category
            </label>
            <div className="w-[90%] m-auto flex flex-wrap gap-2">
              {data.category.map((value) => {
                return (
                  <div
                    key={value._id}
                    className="flex justify-center items-center gap-1 bg-green-500 px-2 rounded-md"
                  >
                    {" "}
                    <p>{value.name}</p>{" "}
                    <RxCross2
                      size={15}
                      className="hover:text-red-500"
                      onClick={(e) => {
                        const filteredData = data.category.find(
                          (item) => item._id === value._id
                        );
                        console.log(filteredData, "filteredData");
                        const index = data.category.indexOf(filteredData);
                        data.category.splice(index, 1);

                        setData((prev) => {
                          return {
                            ...prev,
                            category: [...data.category],
                          };
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <select
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%] m-auto block mt-2 "
              name="category"
              id="category"
              onChange={(e) => {
                const value = e.target.value;
                const currentCategory = category.find(
                  (value) => value._id === e.target.value
                );
                console.log(currentCategory, "currentCategory");
                setData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, currentCategory],
                  };
                });
              }}
            >
              <option value="1">Select Category</option>
              {category.map((value) => {
                return (
                  <option key={value._id} value={value._id}>
                    {value.name}
                  </option>
                );
              })}
            </select>

            <label
              className=" w-[90%]  m-auto pl-4 block"
              htmlFor="subCategory"
            >
              Select the sub category
            </label>
            <div className="w-[90%] m-auto flex flex-wrap gap-2">
              {data.subCategory.map((value) => {
                return (
                  <div
                    key={value._id}
                    className="flex justify-center items-center gap-1 bg-green-500 px-2 rounded-md"
                  >
                    {" "}
                    <p>{value.name}</p>{" "}
                    <RxCross2
                      size={15}
                      className="hover:text-red-500"
                      onClick={(e) => {
                        const filteredData = data.subCategory.find(
                          (item) => item._id === value._id
                        );
                        console.log(filteredData, "filteredData");
                        const index = data.subCategory.indexOf(filteredData);
                        data.subCategory.splice(index, 1);

                        setData((prev) => {
                          return {
                            ...prev,
                            subCategory: [...data.subCategory],
                          };
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <select
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2 "
              name="subCategory"
              id="subCategory"
              onChange={(e) => {
                const value = e.target.value;
                const currentSubCategory = subCategory.find(
                  (value) => value._id === e.target.value
                );
                console.log(currentSubCategory, "currentSubCategory");
                setData((prev) => {
                  return {
                    ...prev,
                    subCategory: [...prev.subCategory, currentSubCategory],
                  };
                });
              }}
            >
              <option value="1">select SubCategory</option>
              {subCategory.map((value) => {
                return (
                  <option key={value._id} value={value._id}>
                    {value.name}
                  </option>
                );
              })}
            </select>

            <label className=" w-[90%]  m-auto pl-4 block" htmlFor="unit">
              Enter the unit
            </label>
            <input
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2"
              type="text"
              id="unit"
              name="unit"
              onChange={(e) => handleInputChange(e)}
            />
            <label className=" w-[90%]  m-auto pl-4 block" htmlFor="stock">
              Enter the stock
            </label>
            <input
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2"
              type="number"
              id="stock"
              name="stock"
              onChange={(e) => handleInputChange(e)}
            />
            <label className=" w-[90%]  m-auto pl-4 block" htmlFor="discount">
              Enter the discount
            </label>
            <input
              className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2"
              type="number"
              id="discount"
              name="discount"
              onChange={(e) => handleInputChange(e)}
            />
            <label
              className=" w-[90%]  m-auto pl-4 block"
              htmlFor="description"
            >
              Enter the description
            </label>
            <textarea
              className="bg-gray-400 rounded-md px-4 w-[90%]  m-auto block mt-2 h-20 resize-none"
              name="description"
              id="description"
              cols="30"
              rows="10"
              onChange={(e) => handleInputChange(e)}
            ></textarea>
            <label
              className=" w-[90%]  m-auto pl-4 block"
              htmlFor="more_details"
            >
              Enter the more details
            </label>
            <section className="w-[90%] m-auto  bg-white rounded-md p-5 ">
              
              {Object.keys(data.more_details).map((value, index) => {
                return (
                  <div
                    key={index}
                    className=" w-full flex flex-col items-center mt-2"
                  >
                    <label
                      className=" w-[90%]  m-auto pl-4 block"
                      htmlFor={value}
                    >
                      {value}
                    </label>
                    <input
                      autoFocus
                      className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2"
                      type="text"
                      id={value}
                      value={data?.more_details[value]}
                      onChange={(e) => {
                        const newdata = e.target.value;
                        setData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [value]: newdata,
                            },
                          };
                        });
                      }}
                    />
                  </div>
                );
              })}
              <button
                type="button"
                onClick={(e) => setShowAddMore(true)}
                className="bg-blue-600 rounded-md text-white p-2 mt-2"
              >
                Add More
              </button>
              {showAddMore && (
                <AddMore
                  close={() => setShowAddMore(false)}
                  value={fieldname}
                  onChange={(e) => setFieldName(e.target.value)}
                  submit={(e) => hanelAddFieldSubmit(e)}
                />
              )}
            </section>
            <div className="flex items-center w-[90%] m-auto mt-2 mb-2">
              <input
                className="h-6 w-6"
                name="publish"
                onChange={(e) => handleInputChange(e)}
                type="checkbox"
                id="publish"
              />
              <label className=" w-[90%]  pl-4 block" htmlFor="publish">
                Publish
              </label>
            </div>

            <button
              type="submit"
              disabled={showAddMore}
              className="w-[90%]  h-10 bg-green-500 hover:bg-green-700 text-white duration-500 rounded-md ml-[5%] mt-[5%]"
            >
              Add Product
            </button>
          </form>
        </section>
      </>
    );
  }
};
export default AddProduct;

const AddMore = ({ close, value, onChange, submit }) => {
  return (
    <>
      <section className="w-full h-full fixed top-0 left-0 bg-neutral-500 bg-opacity-50 z-51 flex justify-center items-center">
        <div className="w-[30%] h-auto bg-white rounded-md p-5 mt-20 mb-30">
          <div className="w-full">
            <RxCross2
              size={20}
              className="ml-[95%] mt-3 hover:text-red-600"
              onClick={() => close()}
            />
          </div>
          <label className=" w-[90%]  m-auto pl-4 block" htmlFor="key">
            Enter the key
          </label>
          <input
            autoFocus
            className="bg-gray-400 rounded-md h-10 pl-4 w-[90%]  m-auto block mt-2 "
            type="text"
            id="key"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
          <div className="w-[90%] m-auto  flex justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={submit}
              className="bg-yellow-400 text-white rounded-md p-2 "
            >
              Add
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
