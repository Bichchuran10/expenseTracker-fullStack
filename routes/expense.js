const express=require('express')

const router=express.Router()

const expenseController=require('../controllers/ExpenseControl');


router.get('/get-expense',expenseController.getExpense);
router.post('/add-expense',expenseController.postExpense);

module.exports=router;