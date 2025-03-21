import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/axios";
import summaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setCatogary } from "../store/product";
import { useDispatch } from "react-redux";
const EditCatogary = (props) => {

  const {_id , name , image} = props.value
    const [data , setData] = useState({
        _id,
        name,
        image,
    })

   
    const [loading , setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const {name , value} = e.target
        setData((prev) => ({...prev , [name] : value}))
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file){
            console.log("file not selected")
            toast.error("no image selected")
        }else{
            setLoading(true)
            const res =  await uploadImage(file)

            console.log(res.data.data.url);
           
    
            setData((prev) => {
                return {
                    ...prev,
                    image : res.data.data.url
                }
            })
            setLoading(false)
        }
       
    }


   
  const getCatagory = async () => {
    try {
      const res = await Axios({
        ...summaryApi.getCatagory,
      });
      dispatch(setCatogary(res.data.data))
    } catch (error) {
      console.log(error);
    }
  };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log(data)
      try {
          const res = await Axios({
            ...summaryApi.updateCatogary,
            data,
          })
          if(res.data.success){
            toast.success(res.data.message)
            props.close();
            getCatagory()
          }
          if(res.data.error){
            toast.error(res.data.message)
          }
      } catch (error) {
          console.log(error)
      }
    }

   
  return (
    <>

      <section className="fixed top-0 left-0 bg-neutral-500 w-full h-full flex justify-center opacity-90  items-center z-50">
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="w-[90%]  md:w-[60%]  bg-gray-200 rounded-md shadow-xl p-6"
        >
          <RxCross2 className="relative left-[97%] top-1 text-2xl font-bold" onClick={props.close}/>
          <label htmlFor="name" className="text-xl font-bold mt-2">
            {" "}
           Edit Catogary Details
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
          <p className="text-xl font-bold mt-2">Upload image</p>
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
              htmlFor="ChooseFile"
              className={`p-2 ${
                data.name ? "bg-amber-300 " : "bg-gray-500"
              }  rounded-md`}
            >
              Choose image
            </label>
          </div>

          <button
            type="submit"
            disabled={data.name && data.image ? "" : "true"}
            className={` ${
              data.name && data.image ? " bg-amber-300" : "bg-gray-600"
            } w-[80%] h-10 rounded-md mt-4 ml-[10%]`}
          >
            {" "}
            {loading ? "Loading..." : "Add Catogary"}
          </button>
        </form>
      </section>
    </>
  );
};


export default EditCatogary ;