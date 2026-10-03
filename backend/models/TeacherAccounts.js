const mongoose=require('mongoose');

const teacherAccountSchema=mongoose.Schema({
    email:String,
    password:String
})

const TeacherAccounts=mongoose.model("TeacherAccount",teacherAccountSchema);

module.exports=TeacherAccounts
