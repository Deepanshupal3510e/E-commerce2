import { Router } from "express";
import { addNewCatogary, deleteCatogary, getCatagory, updateCatogary } from "../controllers/catogary.controller.js";
import auth from "../middleware/auth.js";

const catagoryRoute = Router()


catagoryRoute.post("/add-catogary",auth , addNewCatogary);
catagoryRoute.get("/get-catogary" ,getCatagory);
catagoryRoute.put("/update-catogary" , auth, updateCatogary)
catagoryRoute.post("/delete-catogary", auth, deleteCatogary)
export default catagoryRoute