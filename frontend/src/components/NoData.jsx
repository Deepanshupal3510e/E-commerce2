import React from 'react'
import no_data from "../assets/no_data.json"
import Lottie from 'lottie-react'
const NoData = () => {
  return (
    <>
        <section className='h-full w-full flex items-center justify-center flex-col gap-6 z-1'>
            <Lottie  animationData={no_data} className='w-[40%]'/>
        </section>
    </>
  )
}

export default NoData
