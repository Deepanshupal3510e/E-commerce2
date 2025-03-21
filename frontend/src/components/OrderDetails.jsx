import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
  const user = useSelector(state => state.user)
  const [orderHistory , setOrderHistory] = useState([])

    useEffect(() => {
      setOrderHistory(user.order_history)
    })
  return (
    <section  className='w-full h-auto '>
        <p className='w-full text-center mt-6 mb-6 text-3xl font-serif'> Order Details</p>
        {
          orderHistory.map((value) => {
            return(
              <div key={value._id} className='w-[90%] h-auto shadow-md p-6'>
                <p className='font-bold text-md'>Order Id :- <span className='font-normal text-md'>{value.orderId}</span></p>
                  <div className='w-full h-auto mt-10 md:flex'>
                    {
                     value.products.map((data) => {
                      return (
                        <>
                          <div className='flex justify-center items-center w-40 h-40 mx-auto'>
                            <img className='h-40 w-auto' src={data.image[0]} alt="" />
                          </div>
                          <p className='w-[80%] mx-auto font-bold line-clamp-2 mt-2 '>{data.name}</p>
                          <p></p>
                        </>
                      )
                     })
                    }
                  </div>
              </div>
            )
          })
        }
    </section>
  )
}

export default OrderDetails
