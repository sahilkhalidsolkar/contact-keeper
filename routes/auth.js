const express=require('express')
const bcrypt = require('bcryptjs');
const config=require('config')
const User=require('../models/User')
const jwt = require('jsonwebtoken');
const {check , validationResult}=require('express-validator');
const auth=require('../middelware/auth')
const router=express.Router()

// @route   GET api/auth
// @desc    get login user
// @access  private

router.get('/',auth,async (req,res)=>{
        try {
            const user=await User.findById(req.user.id).select('-password');
            res.send(user)
        } catch (error) {
            res.status(500).json({msg:'server error'})
        }
    

})

// @route   POST api/auth
// @desc    Auth user & get token
// @access  public

router.post('/',[
    check('email','please enter valid email').isEmail(),
    check('password','password is required').exists()
],async (req,res)=>{
    const errors=validationResult(req) // <-- it will show if any errors are there in the check conditions and return the object
    
    // find if any errors
    if(errors.errors.length){
        return res.status(400).json({errors:errors.array()})
    }

    const {email, password } =req.body

    try {
    let user = await User.findOne({email})
    if(!user){
        res.status(400).json({msg:'invalid credentials'})
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(400).json({msg:'invalid credentials'})
    }
    else{
        // generating token
    const payload={
        user:{
            id:user.id
        }
    }
 
        const token=await jwt.sign(payload,config.get('JWTSecret'),{expiresIn:360000})
        res.json({token})
    }

    } catch (error) {
        console.error(error.message)
    }
    



})

module.exports=router