import UserService from './userService'
class UserController {
    constructor(context) {
        this.userService= new UserService(context)
    }
     createUser=(req,res)=>{
        const userDetails= req.body;
        const user= this.userService(userDetails)
        res.status(200).json(user);
     }
}

module.exports=UserController