const express=require('express')
const router=express.Router()
const login=require('../utils/loginUser')

router.route('/login').post(login)

module.exports=router 