import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avtar: "",
  mobile : "",
  verify_email: "",
  login_status : "",
  address_details : [],
  order_history : [],
  shopping_cart : [],
  role : "",
  status : "",
  verify_email : "",
  wishlist : []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload?.name
      state.email = action.payload?.email
      state._id = action.payload?._id
      state.avtar = action.payload?.avtar
      state.mobile = action.payload?.mobile
      state.verify_email = action.payload?.verify_email
      state.login_status = action.payload?.login_status
      state.address_details = action.payload?.address_details
      state.order_history = action.payload?.order_history
      state.role = action.payload?.role
      state.shopping_cart = action.payload?.shopping_cart
      state.status = action.payload?.status
      state.verify_email = action.payload?.verify_email
      state.wishlist = action.payload?.wishlist
    },
    updateAvtar : (state , action) => {
        state.avtar = action.payload.avtar
    },
    logOut : (state) => {
        state._id = ""
        state.name = ""
        state.email = ""
        state.avtar = ""
        state.mobile = ""
        state.verify_email = ""
        state.login_status = ""
        state.address_details  = []
        state.order_history = []
        state.role = ""
        state.shopping_cart = []
        state.status = ""
        state.verify_email = ""
        state.wishlist = []
    },
    setAddress : (state , action) => {
      state.address_details = [...action.payload]
    }
  },
});



export const {setUserDetails , logOut, updateAvtar, setAddress}  = userSlice.actions


export default userSlice.reducer