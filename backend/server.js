const dotenv=require('dotenv');
dotenv.config();

const PORT=process.env.PORT;

const express=require('express');
const app=express();

const connectDb=require('./config/dbConnection.js');
connectDb();


app.listen(PORT,()=>{
     console.log(`App is running on ${PORT}`); 
})



