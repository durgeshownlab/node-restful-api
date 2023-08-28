const express=require('express');
const router = new express.Router();
const Student=require('../models/students');

// for adding a students 
router.post('/students', async (req, res)=>{

    try{
        const user=new Student(req.body);
        const result=await user.save();
        
        res.status(201).send(result);

    }
    catch(e)
    {
        res.status(400).send(e);
    }
});

// for fetching all students 
router.get('/students', async (req, res)=>{
    try{
        const result=await Student.find();
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(404).send(e);
    }
});

// code for fetching the specific student details 
router.get('/students/:id', async (req, res)=>{
    try
    {
        const _id = req.params.id;
        const result = await Student.findById({_id:_id});

        if(!result)
        {
            res.status(404).send('user does not exist...');
        }
        else
        {
            console.log(_id);
            res.send(result);
        }
    }
    catch(e)
    {
        res.status(500).send(e);
    }
});

// code for deleting the user from the database 

router.delete('/students/:id', async (req, res)=>{
    try
    {
        const _id=req.params.id;
        if(!_id)
        {
            res.status(404).send('not found');
        }
        else
        {
            const result=await Student.findOneAndDelete({_id:_id})
            if(!result)
            {
                res.status(404).send('could not delete the user');
            }
            else
            {
                res.status(200).send(result);
            }
        }
    }
    catch(e)
    {
        res.status(500).send(e);
    }
});


// code for updating the student details 

router.patch('/students/:id', async (req, res)=>{
    try{
        const _id=req.params.id;
        const u_data=req.body;
        const result=await Student.findByIdAndUpdate({_id : _id}, u_data, {new: true});
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
});

module.exports = router;