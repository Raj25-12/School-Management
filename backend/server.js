const TeacherAccounts=require('./models/TeacherAccounts.js')
const dotenv=require('dotenv');
dotenv.config();

const PORT=process.env.PORT;

const express=require('express');
const app=express();

app.use(express.json());

const connectDb=require('./config/dbConnection.js');
connectDb();


const adminRoutes=require('./routes/adminRoutes.js');

app.use("/api/v1",adminRoutes);

app.listen(PORT,()=>{
     console.log(`App is running on ${PORT}`); 
})



