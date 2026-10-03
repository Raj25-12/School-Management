const express=require('express');

const router = express.Router();

const {adminCreateAccount,adminLogin}=require('../controller/AdminController');

router.post('/create',adminCreateAccount);
router.post('/login',adminLogin);

module.exports=router