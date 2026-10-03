const express=require('express');

const router=express.Router();

const {teacherCreateAccount,teacherLogin}=require('../controller/TeachersController');

router.post('/create',teacherCreateAccount);
router.post('/login',teacherLogin);

module.exports=router