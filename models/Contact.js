const {Schema,model}=require('mongoose')

const ContactSchema =  Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    type:{
        type:String,
        default:'Personal'
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

module.exports=model('contacts',ContactSchema)
