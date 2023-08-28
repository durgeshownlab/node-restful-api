const express=require("express");
require('./db/conn');
const Student=require("./models/students")
const studentRouter=require("./routers/student");

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);


app.listen(PORT, ()=>{
    console.log("server is runing on port no 3000");
});