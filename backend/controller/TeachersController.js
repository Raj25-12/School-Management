const TeacherAccount=require('../models/TeacherAccounts.js')

const teacherCreateAccount = async(req,res) => {
    const  {email,password}=req.body;
    try{
        const findemail=await TeacherAccount.findOne({email})
        if(findemail)
        {
            res.status(401).json({
                message:"Email Already Exists"
            })
        }
        const response = await TeacherAccount.create({
        email,
        password
    })
    res.status(201).json({
        data:response,
        message:"Create Teacher Account Successfully"
    })
    }
    catch(error)
    {
      res.status(400).json({
        message:"Invalid Crediational"
      })
    }
}

const teacherLogin =async (req,res) =>{
     const {email,password}=req.body;
     try{
        const response=await TeacherAccount.findOne({email})
     if(response)
     {
        if(response.password === password)
        {
            res.status(201).json({
                data:response,
                message:"Login Successfully"
            })
        }
        else{
            res.status(400).json({
                message:"Password is invalid"
            })
        }
     }
     else{
        res.status(400).json({
            message:"Email does not exist"
        })
     }
     }
     catch(error)
     {
        res.status(500).json({
            message:"Server error"
        })
     }

}

module.exports={teacherCreateAccount,teacherLogin}