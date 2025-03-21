import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userDetails"
import productReducer from "./product"
export const store = configureStore({
  reducer: {
    user : userReducer,
    products : productReducer,
  },
})