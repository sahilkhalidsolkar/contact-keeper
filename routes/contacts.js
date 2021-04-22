const express=require('express')
const auth=require('../middelware/auth')
const Contact=require('../models/Contact')
const {check , validationResult}=require('express-validator');
const router=express.Router()

// @route   GET api/contacts
// @desc    get logged in user contacts
// @access  private

router.get('/',auth,async(req,res)=>{
try {
    const contacts= await Contact.find({user:req.user.id})
    res.json(contacts)
} catch (error) {
    res.status(400).json({msg:'server error'})
}
    

})

// @route   POST api/contacts
// @desc    add contacts
// @access  private

router.post('/',[auth,[
    check('name','Please enter your name').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req) // <-- it will show if any errors are there in the check conditions and return the object
    
    // find if any errors
    if(errors.errors.length){
        return res.status(400).json({errors:errors.array()})
    }
    const{name,email,phone ,type } =req.body
    try {
        const newContact= new Contact({
            name,
            email,
            phone ,
            type,
            user:req.user.id
        })
        await newContact.save()
        res.json({msg:'successful'})
    } catch (error) {
        res.status(400).json({msg:'server error'})
        
    }
    
})

// @route   PUT api/contacts/:id
// @desc    edit contacts
// @access  private

router.put('/:id',(req,res)=>{
    res.send('edit contacts')
})
// @route   DELETE api/contacts/:id
// @desc    delete contacts
// @access  private

router.delete('/:id',(req,res)=>{
    res.send('deleted the  contacts')
})

module.exports=router