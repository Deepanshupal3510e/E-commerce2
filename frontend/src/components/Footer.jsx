import React, { useEffect, useState } from 'react'
import { FaFacebookSquare, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
   
   
  return (
        <>
            <footer className='w-full mt-10 bg-indigo-950'>
                <div className='container mx-auto p-10 text-center flex flex-col gap-2 lg:flex-row lg:justify-between' >
                    <p className='text-center text-white'>© All rights reserverd 2025</p>
                    <div className='flex items-center gap-4 justify-center text-2xl mt-4'>
                        <a href="" className='hover:text-yellow-400 duration-200 text-white'>
                        <FaInstagram />
                        </a>
                        <a href="" className='hover:text-yellow-400 duration-200 text-white'>
                        <FaFacebookSquare />
                        </a>
                        <a href="" className='hover:text-yellow-400 duration-200 text-white'>
                        <FaGithub />
                        </a>
                        <a href="" className='hover:text-yellow-400 duration-200 text-white' >
                        <FaXTwitter />
                        </a>
                    </div>
                </div>
            </footer>
        </>
  )
}
export default Footer
