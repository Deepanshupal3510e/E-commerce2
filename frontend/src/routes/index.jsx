import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ChangePassword from "../pages/ChangePassword";
import Myaccount from "../pages/Myaccount";
import UpdateUserDetails from "../pages/UpdateUserDetails";
import Dashboard from "../components/Dashboard";
import ProductCatogary from "../pages/ProductCatogary";
import SubCatogary from "../pages/SubCatogary";
import UploadProducts from "../pages/UploadProducts";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import MyOrders from "../pages/MyOrders";
import MyAddress from "../pages/MyAddress";
import IsAdmin from "../components/IsAdmin";
import ProuductList from "../pages/ProuductList";
import ProductDetails from "../pages/ProductDetails";
import Wishlist from "../pages/WishList";
import VerifyEmail from "../pages/VerifyEmail";




const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/search",
                element: <SearchPage />
            },
            {
                path : "/login",
                element:<Login />
            },
            {
                path : "/register",
                element : <Register />
            },
            {
                path: "/reset-password",
                element : <ForgotPassword />
            },
            {
                path :"/verify-forgot-password-otp",
                element : <VerifyOtp />
            },
            {
                path : "/change-password",
                element : <ChangePassword />
            },
            {
                path : "/my-account",
                element : <Myaccount />
            },
            {
                path : "/update-user-details",
                element : <UpdateUserDetails />
            },
            {
                path : "/product-catogary",
                element : <IsAdmin><ProductCatogary /></IsAdmin>
            },
            {
                path : "/sub-catogary",
                element : <IsAdmin><SubCatogary /></IsAdmin>
            },
            {
                path : "/upload-products",
                element : <IsAdmin><UploadProducts /></IsAdmin>
            },
            {
                path : "/products",
                element :<IsAdmin> <Products /></IsAdmin>
            },
            {
                path : "/my-cart",
                element : <Cart />
            },
            {
                path : "/my-orders",
                element : <MyOrders />
            },
            {
                path : "/my-address",
                element : <MyAddress />
            },
            {
                path : "/my-wishlist",
                element : <Wishlist />
            },
            {
                path : "/verify-email",
                element : <VerifyEmail />
            },
            {
                path: "/product-list",
                children:[
                    {
                        path : ":category",
                        element : <ProuductList />
                    }
                ]
            },
            {
                path : "/show-product-details",
                children:[
                    {
                        path : ":name-id",
                        element : <ProductDetails />
                    }
                ]
            }
        ]
    }
])

export default routes