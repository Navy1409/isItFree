const express=require('express')
const router=express.Router()
const Login=require('../utils/loginUser')
const login= new Login();
const register=require('../utils/register')

router.route('/login').post(login.login)
router.route('/register').post(register)
module.exports=router 