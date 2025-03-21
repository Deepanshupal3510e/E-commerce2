
import { Router } from "express";
import { addSubCategory, deleteSubCategory, editSubCategory, getSubCategory } from "../controllers/subcategory.controller.js";

import auth from "../middleware/auth.js"

const subCategoryRouter = Router()


subCategoryRouter.post("/add-sub-category" ,auth, addSubCategory)
subCategoryRouter.post("/get-sub-category" ,  getSubCategory)
subCategoryRouter.post("/edit-sub-category" ,auth , editSubCategory)
subCategoryRouter.post("/delete-sub-category" ,auth ,  deleteSubCategory)




export default subCategoryRouter