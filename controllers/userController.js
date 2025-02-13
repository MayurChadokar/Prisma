const getJwtToken = require('../helper/getJwtToken');
const prisma=require('../prisma/index');
const cookieToken = require('../utils/cookieToken');
const bcrypt=require('bcryptjs');

// create a user 

exports.signup = async (req, res) => {
   try{
    const {name,email, password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"All fields are required"});
    }
    const newpassword = bcrypt.hashSync(password, 10);
    const user= await prisma.user.create({
        data:{
           name: name,
           email:email,
password:newpassword
        }
    });
    cookieToken(user,res);
  
    }catch(err){
        console.log(err);
        return res.status(400).json({error:"Something went wrong"});
    };        
   };

   exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"});
        }
       const user= await prisma.user.findUnique({
        where:{
            email       
    
        }
       });
       if(!user){
        return res.status(400).json({error:"user is not found"});

       }
       // password 
         const isMatch=bcrypt.compareSync(password,user.password);
         if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"});
         }
         console.log("user login in successfully");
         cookieToken(user,res);
         

        }
        catch(error){
          res.status(500).json({
            success:false,
            message:"internal error in the login stuff",
          });
        }
    };

 exports.logout=(req,res)=>{
     try{
        res.clearCookie('token');
        return res.status(200).json({message:"user is logged out"});
     }
     catch(error){
        return res.status(500).json({
            success:false,
            message:"internal error in the logout stuff",
          });
        }
     };

    
     

 
  


