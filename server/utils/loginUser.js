const UserService= require('../features/users/userService')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const {StatusCodes}=require('http-status-codes')


class LoginUser {
    constructor(context) {
        this.userService= UserService(context)
    }
    login= async (req , res)=>{
    const {email, passsword}=req.body;
    const user= this.userService.getUserByEmail(email);
    if(!user){
        throw new Error('User does not exist');
    }
    const ok= await bcrypt.compare(user.passsword, passsword);
    if(!ok){
        throw new Error('Password does not match')
    }
    const token= jwt.sign({id:user.userId, isAdmin:user.isAdmin, organsation: user.organisationId}, process.env.JWT_SECRET, {expiresIn:"30d"});
    res.status(StatusCodes.OK).json(token);
}
}

module.exports=LoginUser