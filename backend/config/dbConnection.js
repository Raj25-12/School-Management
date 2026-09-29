const mongoose=require('mongoose');

const connectDB = () => {
  try{
    mongoose.connect(process.env.URI);
    console.log("DataBase Connected Successfully");
  }
  catch(error)
  {
    console.log("Cannot Connect to the Database facing some error Fix it first",error);
  }
}

module.exports=connectDB;