const mongoose=require("mongoose");

const StudentAccountSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password:{
        type:String,
        required:true,
    },

    studentClass:{
        type:String,
        required:true,
    },

    rollNumber:{
        type:String,
        required:true
    },

})

const StudentAccounts=mongoose.model("StudentAccount",StudentAccountSchema);

module.exports=StudentAccounts