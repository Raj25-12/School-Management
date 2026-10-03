const mongoose=require('mongoose');

const adminAccount=mongoose.Schema({
    email:String,
    password:String,
})

const AdminAccount=mongoose.model("AdminAccount",adminAccount);

module.exports=AdminAccount