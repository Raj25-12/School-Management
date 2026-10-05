const express=require('express');
const router=express.Router();

const {studentCreateAccount,studentLogin} = require('../controller/StudentsController');

router.post('/create',studentCreateAccount);
router.post('/login',studentLogin)

module.exports=router


