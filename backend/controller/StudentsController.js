const StudentAccounts=require('../models/StudentAccounts');

const studentCreateAccount = async (req,res) =>{

    const {fullName, email, password, studentClass, rollNumber}=req.body;
     
    try{
        const findemail=await StudentAccounts.findOne({email})

        if(findemail){
            res.status(401).json({
                message:"Email Already Exist"
            })
        }

        const response =await StudentAccounts.create({
            fullName,
            email,
            password,
            studentClass,
            rollNumber
        })

        res.status(201).json({
            data:response,
            message:"Create Student Successfully"
        })
    }

    catch(error)
    {
        res.status(500).json({
            message:"Invalid Details"
        })
    }

}

const studentLogin =async (req,res)=>{
   const {email,password} = req.body;

   try{
        const response=await StudentAccounts.findOne({email})
        if (response)
        {
            if(response.password === password)
            {
                res.status(201).json({
                    data:response,
                    message:"Login Successfully"
                })
            }
            else{
                res.status(401).json({
                    message:"Password is Incorrect"
                })
            }
        }
        else{
            res.status(401).json({
                message:"Email does not Exist Try again"
            })
        }
   }
   catch(error)
   {
    res.status(500).json({
        message:"Something went Wrong"
    })
   }
}

module.exports={studentCreateAccount,studentLogin}