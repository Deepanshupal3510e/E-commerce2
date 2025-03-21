import e from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/user.model.js";

export const AddProduct = async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;

    const product = new productModel(data);
    const result = await product.save();
    return res.json({
      message: "Product added",
      error: false,
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    console.log(products , "this is products")
    return res.json({
      message: "All Products",
      error: false,
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    let { page, limit, search } = req.body;

    page = Number(page);
    limit = Number(limit);

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 15;
    }

    console.log(search, "search");

    let query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    const pageNo = totalCount / limit;

    return res.json({
      message: "product search successfull",
      success: true,
      error: false,
      totalCount,
      noOfPages: Math.ceil(pageNo),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;

    const category = await productModel.find({ category: { $in: [id] } });

    let newOrder = category
      .map((_, index) => index)
      .sort(() => Math.random() - 0.5);
    let reIndexCategoryArray = newOrder.map((i) => category[i]);;






    return res.json({
      message: "this is the data",
      error: false,
      success: true,
      data: reIndexCategoryArray,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { userId, product } = req.body;

    if (!userId || !product) {
      return res.status(400).json({
        message: "please provide required feilds like userId or ProductId",
        error: true,
        success: false,
      });
    }

    const user = await userModel.find({ _id: userId });

    if (!user) {
      return res.status(401).json({
        message: "user not exist",
        error: true,
        success: false,
      });
    }

    const added = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { wishlist: product } },
      { new: true }
    );

    return res.json({
      message: "product added in wishlist",
      success: true,
      error: false,
      data: added,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const removeWishList = async (req, res) => {
  try {
    const { id, product } = req.body;
    console.log("remove product requested");

    const user = await userModel.find({ _id: id });
    if (!user) {
      return res.status(401).json({
        message: "user not exist ",
        error: true,
        succcess: false,
      });
    }

    const update = await userModel.findByIdAndUpdate(
      { _id: id },
      { $pull: { wishlist: product } },
      { new: true }
    );

    return res.json({
      message: "product remove succesfully",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export const addProductInCart = async (req , res) => {
  try {
    const {userId , product} = req.body

    if(!userId && !product){
      return res.json({
        message : "please provide required fields like userId or Product",
        error : true,
        success : false
      })
    }

    const user = await userModel.find({_id : userId});


    if(!user){
      return res.status(401).json({
        message : "user not exist",
        error : true,
        success : false
      })
    }

    const added = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { shopping_cart : product } },
      { new: true }
    );

    return res.json({
      message : "product added in Cart",
      success : true,
      error : false,
      data : added
    })

  } catch (error) {
      return res.status(500).json({
        message : error.message || error,
        success : false,
        error : true
      })
  }
}



export const removeProductFromCart = async (req , res) => {
  try {
    const {userId , product} = req.body;

    if(!userId && !product){
      return res.status(400).json({
        error : true,
        success : false,
      })
    }

    const user = await userModel.find({_id : userId});

    if(!user){
      return res.status(401).json({
        message : "user not exist",
        error : true,
        success : false
      })
    }

    const update = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { shopping_cart : product } },
      { new: true }
    );

    return res.json({
      message : "product removed from cart",
      error : false,
      success : true,
      data : update
    })

  } catch (error) {
     return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
      })
  }
}

export const searchProduct = async (req , res) => {
  try {
      const {searchString} = req.body

      const product = await productModel.find();
      let data = []
       product.map((value) => {
        console.log(value.name.toLowerCase());
        if(value.name.toLowerCase().includes(searchString.toLowerCase())){
          data = [...data , value]
        }
       
      })
      return res.json({
        message : " these are your products",
        error : false,
        success :true,
        data ,
      })
  } catch (error) {
      return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
      })
  }
}