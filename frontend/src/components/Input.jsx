import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack, IoMdSearch } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import useMobile from '../hooks/useMobile'
import Axios from "../utils/axios"
import summaryApi from '../common/SummaryApi'
import { useDispatch, useSelector } from "react-redux";
import { removerSearchProduct, setSearchProduct } from '../store/product'

const Input = () => {

    const location = useLocation();
    const dispatch = useDispatch()
    const [isSearch , setisSearch] = useState(false);
    const [isMobile] = useMobile()
    const [searchString , setSearchString] = useState("")
    const [icon , setIcon] = useState(isMobile == true && location.pathname === "/search");



    const handleInputChange = async (e) => {
       await setSearchString(e.target.value);

        
        setTimeout(async () => {
            const res = await Axios({
                ...summaryApi.searchProducts,
                data : {searchString}
            })  
            dispatch(setSearchProduct(res.data.data))
        }, 1000);
    }

    useEffect(() => {   
        const check = "/search" === location.pathname
        setisSearch(check)
    },[location])
    return (
        <>
        
            <div className='w-full min-w-[200px] md:min-w-[300px] lg:min-w-[420px] h-12 rounded-md border-2 border-gray-300  flex flex-row items-center gap-2 lg:gap-4 bg-gray-100 focus-within:border-gray-400 '>
                <Link to={icon ? "/" : "/search"} className='h-full ml-2 text-gray-600 text-xl'>

                    {
                        icon ? (<IoMdArrowRoundBack className='mt-3 text-2xl' />) : ( <IoMdSearch  className='mt-3 text-2xl'  />)
                    }
                   
                </Link>
                <Link to={"/search"} className='text-gray-500 text-[10px] lg:text-sm w-full' >
                {
                    isSearch ? (
                        <input autoFocus type="text" value={searchString} onChange={(e) => handleInputChange(e)}  className='text-gray-500 text-sm md:text-lg  border-0 outline-0  w-full'  />
                    ) : (

                        <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'Search products "Headphone"',
                            1000, // wait 1s before replacing "Mice" with "Hamsters"
                            'Search products "Monitor"',
                            1000,
                            'Search products "Laptop"',
                            1000,
                            'Search products "Clothes"',
                            1000,
                            'Search products "Electronics"',
                            1000, // wait 1s before replacing "Mice" with "Hamsters"
                            'Search products "Saree"',
                            1000,
                            'Search products "Mobiles"',
                            1000,
                            'Search products "any things"',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                    )
                    
                }

                </Link>
            </div>
        </>
    )
}

export default Input
