import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductsInDashboard = ({value}) => {
  const navigate = useNavigate()
const handleNavigateClick = (value) => {
    const url = value.name.toLowerCase().replaceAll(" " , "-")+value._id.replaceAll("  " , "-")
    navigate(`/show-product-details/${url}` , {
      state : value,
    })
  }
  return ( 
        <div className='w-34 md:w-46 h-auto bg-white shadow-md rounded-md m-2 p-2' onClick={(e) => handleNavigateClick(value)}>
            <img className='h-35 w-auto mx-auto mt-2 rounded-md' src={value.image[0]} alt="" />
            <p className='mt-2 w-[90%} ml-[5%] text-sm font-bold text-ellipsis line-clamp-1'>{value.name}</p>
            <p className='mt-2 ml-2 font-bold text-md'>₹{value.price}</p>
            <p className='mt-2 ml-2 w-[90%] text-ellipsis line-clamp-2 text-sm'>{value.description}</p>
        </div>
  )
}

export default ProductsInDashboard
