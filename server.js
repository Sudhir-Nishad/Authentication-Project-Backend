const express=require('express');
const app= express();
const connectDb=require('./database/db.js');
const cors =require('cors');
connectDb();
const User=require('./database/user.js');
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("nice working !...")
});
app.post("/register", async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        console.log(req.body);
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username, email and password are required.' });
        }
        if (await User.findOne({ username })) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const user= new User({username,email,password});
        // console.log(user);
        await user.save();
        res.status(200).json({message:'Successfully registered !...'});
    } catch (error) {
        // console.log(error);
        res.status(500).json({error:'Registration failed'});
    }
});
app.post("/login",async (req,res)=>{
    try {
        const {username,password}=req.body;
        const user =await User.findOne({username,password});
        if(!user || !password){
            return res.status(401).json({error:"invalid username or password"});
        }
        res.status(200).json({message:"login succesfully"});
    } catch (error) {
        res.status(401).json({message:"login failed!..."});
    }
})
app.listen(8000,()=>{
    console.log('Server is working properly !..')
})

