const BadRequestError=require('../errors/bad-request')
const Unauthenticated=require('../errors/unauthenticated')
const { StatusCodes } = require('http-status-codes')
const jwt=require('jsonwebtoken')
require("dotenv")
const Login=async(req,res)=>{
    const {username,password}=req.body;
    const id=new Date().getDate()
    // -------------------3 ways to handle username and password----------
    // mongoose validation
    //Joi libaray 
    //check in the control
    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{ expiresIn: '30d' })
    // console.log(userName,password)
     res.status(StatusCodes.OK).json({msg:'User Created' , token})
}
const Dashboard=async(req,res)=>{
    const authHeader=req.headers.authorization; // like taht ==> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJOYW1lIjoiYWxpIiwiaWF0IjoxNjQ1NjUxOTgzLCJleHAiOjE2NDgyNDM5ODN9.vejxxARZ8i4fNH302_aPz-AzY7IWi3QQu8XG8mkli7Q
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new Unauthenticated('Not Token Provided') //401 unauthorize user
    }
    const token=authHeader.split(' ')[1];
    console.log(token)
    try {
        // how to decode token
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        const luckyNumber=Math.floor(Math.random()*100)
        //console.log(req.headers)
        res.status(200).json({msg:`Hello Sir ${decode.username}`,Secret:`Your NUMBER ${luckyNumber}`})
    } catch (error) { 
        throw new Unauthenticated('Not Authorize To Access this route')
    }
}
module.exports={Dashboard,Login}