import React, { useState } from 'react'
import uploadImage from '../utils/uploadImage';
import toast from 'react-hot-toast';
import Axios from '../utils/axios';
import summaryApi from '../common/SummaryApi';
import { use } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { setCatogary } from '../store/product';
const CreateCatogary = (props) => {

    const dispatch  = useDispatch()
    const [loading , setLoading] = useState(false)
    
    const [data , setData] = useState({
        name : "",
        image : ""
    });



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
            console.log(data)
            setLoading(false)
        }
       
    }

   

    const CreateCatogary = async (e) => {
        e.preventDefault();
        try {
            

            const response = await Axios({
                ...summaryApi.addCatagory,
                data
            })
            console.log(response)
            if(response.data.error){
                toast.error(response.data.message)
            }
            if(response.data.succes){
                toast.success(response.data.message)
                setData({
                    name : "",
                    image : ""
                })
                props.close();
             getCatagory()

            }
        } catch (error) {
            console.log(error)
        }finally{

        }
    }



  return (
    <section className=' fixed w-full h-full top-0 right-0 flex justify-center items-center bg-neutral-500 opacity-90 z-50'>
        <form onSubmit={(e) => CreateCatogary(e)} className='w-[90%]   md:w-[70%] bg-gray-200 rounded-md shadow-xl p-6'>
            <div className='flex justify-between px-3'>
                <p className='text-xl md:text-2xl'>Create Catogary</p>
                 <RxCross2 size={20} className="block " onClick={props.close}/>
            </div>
            <label htmlFor="name" className='text-md font-bold mt-2 block'> Catogary name</label>
            <input name="name" value={data.name} onChange={(e) => handleInputChange(e)} type="text"  id='name' className='w-[80%] h-10 pl-2 text-md bg-gray-300 mt-2 rounded-lg' placeholder='Enter Catogary name'/>
            <p className='text-md font-bold mt-2'>Upload image</p>
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-[90%] h-60 md:h-40 md:w-40 bg-gray-300 mt-2 rounded-sm flex justify-center items-center'>
                    {
                        data.image ? (<img src={data.image} className='w-full h-full object cover'/>) : ("no image")
                    }
                </div>
                <input disabled={!data.name} onChange={(e) => handleImageUpload(e)} type="file" id='ChooseFile' className='hidden '  />
                {loading ? "" :  <label htmlFor="ChooseFile" className={`p-2 ${data.name ? "bg-amber-300 " : "bg-gray-500"}  rounded-md`}>Choose image</label> }
               
            </div>

            <button type='submit'  disabled={data.name && data.image && !loading? "" : "true"} className={` ${data.name && data.image ? " bg-amber-300" : "bg-gray-600"} w-[80%] h-10 rounded-md mt-4 ml-[10%]`}> {loading ? "Loading..." : "Add Catogary"}</button>
        </form>
    </section>
  )    
}

export default CreateCatogary
