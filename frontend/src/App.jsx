
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useMemo, useState } from 'react';
import Axios from './utils/axios';
import summaryApi from './common/SummaryApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCatogary, setProducts } from './store/product';
import { Toaster } from 'react-hot-toast';
import { setSubCategory } from './store/product';
import { setUserDetails } from './store/userDetails';
import ShowVerify from './pages/ShowVerify';
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
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




  const getSubCategory = async () => {
    try {
        const res = await Axios({
          ...summaryApi.getSubCategory
        })

      await  dispatch(setSubCategory(res.data.data))
    } catch (error) {
      
    }
  }


  const getProducts = async () => {
    const res = await  Axios({
      ...summaryApi.getProducts

    })
    dispatch(setProducts(res.data.data))
  }


  useEffect(() => {
    getCatagory();
    getSubCategory()
    getProducts()
  }, []);



  



  return (
    <>
   
    <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
