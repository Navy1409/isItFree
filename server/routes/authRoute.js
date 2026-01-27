const express=require('express')
const router=express.Router()
const register=require('../utils/register')

router.route('/register').post(register)
module.exports=router 