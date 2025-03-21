
import express from 'express';
import { AddProduct, addProductInCart, addToWishlist, getProductByCategory, getProductById, getProducts, removeProductFromCart, removeWishList, searchProduct } from '../controllers/product.controller.js';
import auth from '../middleware/auth.js';
import { addAddress } from '../controllers/users.controller.js';

const ProductRouter = express.Router();


ProductRouter.post('/add-product',auth, AddProduct)
ProductRouter.get('/get-products', getProducts)
ProductRouter.post('/search-products'  , getProductById)
ProductRouter.post('/get-product-by-category' , getProductByCategory)
ProductRouter.post('/add-wishlist', auth , addToWishlist)
ProductRouter.post('/remove-wishlist' ,auth ,  removeWishList)
ProductRouter.post('/add-to-cart'  , addProductInCart)
ProductRouter.post('/remove-prouduct-to-cart', removeProductFromCart)
ProductRouter.post('/search-product' , searchProduct)

export default ProductRouter;   