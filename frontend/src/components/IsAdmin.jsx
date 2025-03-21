import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const IsAdmin = ({children}) => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate("/")

  return (
    <>
      {
        user.role == "ADMIN"  ? children : (<p className='text-xl px-2 py-4 font-bold bg-amber-200 text-red-500 text-center'>You don't have permission to access this page</p>)
      }
    </>
  )
}

export default IsAdmin
