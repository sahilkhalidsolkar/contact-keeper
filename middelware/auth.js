const jwt = require('jsonwebtoken');
const config=require('config')
const bcrypt = require('bcryptjs');

module.exports=function (req ,res ,next){

    const token = req.header('x-auth-token')

    if(!token){
        return res.status(400).json({msg:'no token ,authorization denied'})
    }
    try {
        const decode=jwt.verify(token,config.get('JWTSecret'))
        req.user=decode.user
        next()
    } catch (error) {
        console.error(error.message)
        res.status(400).json({msg:'no such token found'})
    }
    


}