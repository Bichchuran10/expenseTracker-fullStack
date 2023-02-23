const express=require('express');

const sequelize=require('./util/database');

const bodyParser=require('body-parser');

const cors=require('cors');

const app=express();

const expenseRouter=require('./routes/expense');

app.use(cors())
app.use(bodyParser.json({extended:false}))
app.use('/user',expenseRouter);


sequelize
.sync({force : true})
.then(res=>{
    //console.log(res)
    app.listen(3000)
})
.catch((e)=>console.log(e));