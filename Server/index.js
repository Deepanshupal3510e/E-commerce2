import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import connectDatabase from './config/connectdb.js';
import userRouter from './routes/users.route.js';
import catagoryRoute from './routes/catagory.route.js';
import imageUpload from './routes/uploadImage.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import ProductRouter from './routes/product.route.js';
const app = express();
app.use(cors({
    credentials : true,
    origin : "https://onlineshopbydeepanshu.netlify.app"

}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://onlineshopbydeepanshu.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
  
    next();
  });

app.use(express.json())
app.use(cookieParser())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT || 8000;







app.use("/api/user" , userRouter)
app.use("/api/catogary" , catagoryRoute)
app.use("/api/file" , imageUpload)
app.use("/api/sub-category" , subCategoryRouter)
app.use("/api/product" , ProductRouter)

// app.use("/" , (req , res) => {
//     res.json({
//         message : "server is running "
//     })
// })
connectDatabase()
.then(() => {
    app.listen(PORT , () => {
        console.log("server is  running..." , PORT)
    })
})
