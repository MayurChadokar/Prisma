const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const { user } = require('../prisma');
dotenv.config();


const getJwtToken=(userId)=>{
 return jwt.sign({userid: userId},process.env.JWT_SECRET,
    {expiresIn:'7d'});    
}
    
module.exports=getJwtToken;     
