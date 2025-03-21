import React, { useState } from 'react'
import Axios from '../utils/axios';
import summaryApi from '../common/SummaryApi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logOut } from '../store/userDetails';

const LogOut = () => {
const user = useSelector(state => state.user)
const dispatch = useDispatch()
        const handleLogOut = async () => {
        try {
            const res = await Axios({
                ...summaryApi.logOut,
                data : {_id : user._id}
            })
            if(res.data.success){
                dispatch(logOut());
                localStorage.clear();
                toast.success("loged out successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }   
  return (
    <div className='p-2 bg-red-600 text-white rounded-md inline-block mt-2' onClick={handleLogOut}>
          logout
    </div>
  )
}

export default LogOut
