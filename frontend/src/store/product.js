import { createSlice } from "@reduxjs/toolkit"


const initialValue = {
    catogary : [],
    subCatogary : [],
    product : [],
    searchProduct : [],
}


const productSlice = createSlice({
    name : 'products',
    initialState : initialValue,
    reducers : {
        setCatogary : (state , action) => {
            state.catogary = [...action?.payload]
        },
        setSubCategory : (state , action) => {
            state.subCatogary = [...action?.payload]
        },
        setProducts : (state , action) => {
            state.product = [...action?.payload]
        },
        setSearchProduct : (state, action) => {
            state.searchProduct = [...action?.payload]
        },
        removerSearchProduct : (state , action) => {
            state.searchProduct = []
        }
    }
    
})

export  const {setCatogary , setSubCategory, setProducts,setSearchProduct,removerSearchProduct} = productSlice.actions


export default productSlice.reducer;