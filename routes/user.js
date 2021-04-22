const express=require('express')
const bcrypt = require('bcryptjs');
const config=require('config')
const User=require('../models/User')
const jwt = require('jsonwebtoken');

const {check , validationResult}=require('express-validator');

const router=express.Router()
// @route   POST api/users
// @desc    register a user
// @access  public

router.post('/',
[
    check('name','Please enter your name').not().isEmpty(),
    check('email','please enter your email').isEmail(),
    check('password','Please enter password with 6 or more characters').isLength({ min:6 })

]
,async (req,res)=>{
    const errors=validationResult(req) // <-- it will show if any errors are there in the check conditions and return the object
    
    // find if any errors
    if(errors.errors.length){
        return res.status(400).json({errors:errors.array()})
    }
    const { name ,email ,password }=req.body
    try {
    const findUser=await User.findOne({email})
    if(findUser){
        return res.status(400).json({msg:"user already exists"})
    }
   const user=new User({
        name,
        email,
        password
    })
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password=hash
    // saving to database
    await user.save()
    // generating token
    const payload={
        user:{
            id:user.id
        }
    }

    const token = await jwt.sign(payload,
            config.get('JWTSecret'),{
                    expiresIn:360000
                })
                res.json({token})


    } catch (error) {
        console.error(error.message)
    }
    

})

module.exports=router