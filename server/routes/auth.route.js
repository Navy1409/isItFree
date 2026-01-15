const express=require('express')
const router=express.Router()
const login=require('../utils/loginUser')
const register=require('../utils/register')

router.route('/login').post(login)
router.route('/register').post(register)
module.exports=router 