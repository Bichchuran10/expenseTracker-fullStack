const Expense=require('../models/Expense');

exports.postExpense=async(req,res,next)=>{
    try{
        if(!req.body.amount)
        {
            throw new Error('amount is mandatory')
        }

        const amount=req.body.amount;
        const description=req.body.description;
        const category=req.body.category;
        
        //console.log(amount,description,category);
        const data=await Expense.create({amount: amount, description: description, category:category})
        res.status(201).json({newExpense: data})
    }
    catch(e)
    {
        console.log(e)
        res.status(404).json({error : e});
    }
}

exports.getExpense=async(req,res,next)=>{
    try{
        const data=await Expense.findAll()
        res.status(200).json({allExpense:data})
    }
    catch(e)
    {
        res.send(404).json({error : e});
        console.log("Get bookings not working",e)
    }
}


exports.deleteExpense=async(req,res,next)=>{
    
    try{
        const expenseId=req.params.id
        console.log(`id issss ${expenseId}`)
        if(req.params.id=='undefined')
        {
            console.log(`hellooo no id is found`)
            return res.status(400).json({ err: 'No ID match is found'})
        }
       await Expense.destroy({where : {id: expenseId}})
       res.sendStatus(200)
       console.log('Deletion successfull')
    }
    catch(e)
    {
        console.log(e)
        res.status(500).json({error:e})
    }
}