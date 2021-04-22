const mongoose=require('mongoose')
const config=require('config')
const db=config.get('mongoURI')


// connect to mongodb with mongoose

const connectDB=async ()=>{
    try {
        await mongoose
        .connect(db,{
            useNewUrlParser:true,
            useFindAndModify:false,
            useCreateIndex:true,
            useUnifiedTopology: true,
        })
        console.log('mongodb connected')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
    
}

module.exports=connectDB