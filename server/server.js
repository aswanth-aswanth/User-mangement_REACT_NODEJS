const express=require('express');
const userRoute=require('./routes/userRoute.js');
const adminRoute=require('./routes/adminRoute.js');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const multer=require('multer');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/user_management')
.then(()=>{
    console.log("Connected successfully");
})
.catch(error => handleError(error)); 

app.use('/uploads',express.static('uploads'));

app.use("/user",userRoute);
app.use("/admin",adminRoute);
// app.use("/admin",adminRoute);

const port=process.env.PORT||3000;

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})