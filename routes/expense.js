const express=require('express')

const router=express.Router()

const expenseController=require('../controllers/ExpenseControl');


router.get('/get-expense',expenseController.getExpense);
router.post('/add-expense',expenseController.postExpense);
router.delete('/delete-expense/:id',expenseController.deleteExpense)

module.exports=router;