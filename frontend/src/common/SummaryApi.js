
import ChangePassword from "../pages/ChangePassword";

export const baseUrl = "https://onlineshopbackend.vercel.app";

const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },

  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgotPassword: {
    url: "/api/user/forgot-password",
    method: "post",
  },
  vefiyOtp: {
    url: "/api/user/forgot-password-verify-otp",
    method: "post",
  },
  ChangePassword: {
    url: "/api/user/reset-password",
    method: "post",
  },
  getUserDetails: {
    url: "/api/user/get-user-details",
    method: "post",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  logOut : {
    url : "/api/user/logout",
    method : "get",
  },
  uploadAvtar : {
    url : "/api/user/upload-avtar",
    method : "put"
  },
  updateUserDetails : {
    url : "/api/user/update-user",
    method : "post"
  },
  addCatagory : {
    url :"/api/catogary/add-catogary",
    method : "post"
  },
  uploadImage : {
    url : "/api/file/upload",
    method : "post"
  },
  getCatagory : {
    url : "/api/catogary/get-catogary",
    method : "get"
  },
  updateCatogary : {
    url : "/api/catogary/update-catogary",
    method : "put"
  },
  deleteCatogary : {
    url : "/api/catogary/delete-catogary",
    method : "post"
  },
  addSubCategory : {
    url : "/api/sub-category/add-sub-category",
    method : "post"
  },
  getSubCategory : {
    url : "api/sub-category/get-sub-category",
    method : "post"
  },
  editSubCategory : {
    url :"api/sub-category/edit-sub-category",
    method : "post"
  },
  removeSubCategory : {
    url : "api/sub-category/delete-sub-category",
    method : "post"
  },
  addProduct : {
    url : "api/product/add-product",
    method : "post"
  },
  getProducts : {
    url : "/api/product/get-products",
    method : "get"
  },
  searchProduct : {
    url : "/api/product/search-products",
    method : "post"
  },
  getProductByCategory : {
    url : "/api/product/get-product-by-category",
    method : "post"
  },
  addToWishlist : {
    url : "/api/product/add-wishlist",
    method : "post"
  },
  removeFromWishlist : {
    url : "/api/product/remove-wishlist",
    method : "post"
  },
  addToCart : {
    url : "/api/product/add-to-cart",
    method : "post"
  },
  removeToCart : {
    url : "/api/product/remove-prouduct-to-cart",
    method : "post"
  },
  addAddress : {
    url : "/api/user/add-address",
    method : "post"
  },
  getAddress : {
    url : "/api/user/get-address",
    method : "get"
  },
  placeOrder : {
    url : "api/user/save-order-details",
    method : "post"
  },
  searchProducts : {
      url : "api/product/search-product",
      method : "post"
  },
  verifyEmails : {
    url : "/api/user/verify-email",
    method : "post"
  },
};

export default summaryApi;
