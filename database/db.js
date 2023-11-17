const mongoose=require('mongoose');
const connectDb= async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
        console.log('Connect to Mongodb')
    }
    catch(error){
        console.log("Error !...");
    }

}
module.exports=connectDb;
// export default connectDb;