const AdminAccount=require('../models/AdminAccount')

const adminCreateAccount = async(req,res) => {
      try{
        const {email,password} = req.body;
        const response = await AdminAccount.create({
            email:email,
            password:password
        })
        res.json(response);
      }
      catch(error)
      {
        res.send(error)
      }
}

const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const response = await AdminAccount.findOne({
            email
        })
        if(response)
        {
           if(response.password === password)
           {
             res.status(201).json({
                 message:"Login Successfully",
                 data:response
             })
           }
           else{
               res.status(400).json({
                message:"Password is not correct"
               })
           }
        }
        else{
            res.status(400).json({
                message:"Email does not exists"
            })
        }
    }
    catch(error)
    {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

module.exports={adminCreateAccount,adminLogin}