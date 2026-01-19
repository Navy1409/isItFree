const UserService= require('../features/users/userService')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const {StatusCodes}=require('http-status-codes')


class LoginUser {
    constructor() {
        this.userService= new UserService()
    }
    login= async (req , res)=>{
    const {emailId, password}=req.body;
    const user=await this.userService.getUserByEmail(emailId);
    if(!user){
        throw new Error('User does not exist');
    }
    const ok= await bcrypt.compare( password,user[0].password);
    if(!ok){
        throw new Error('Password does not match')
    }
    const token= jwt.sign({id:user.userId, isAdmin:user.isAdmin, organsation: user.organisationId}, process.env.JWT_SECRET, {expiresIn:"30d"});
    res.status(StatusCodes.OK).json(token);
}
}

module.exports=LoginUser