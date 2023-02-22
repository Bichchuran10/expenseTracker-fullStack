const save=async(event)=>
{
    try{
        event.preventDefault()
        const amount=event.target.amount.value;
        const description=event.target.description.value;
        const category=event.target.type.value;

        let expense={
            amount,
            description,
            category
        }

        let response=await axios.post('https://crudcrud.com/api/0e3660f902924cbba6b69cb8afc93449/expenseData',expense)
        showExpenseOnScreen(response.data)
        
    }
    catch(e)
    {
        console.log(e)
    }
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        let response=await axios.get('https://crudcrud.com/api/0e3660f902924cbba6b69cb8afc93449/expenseData')

        for(let i=0;i<response.data.length;i++)
        {
            showExpenseOnScreen(response.data[i])
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

const showExpenseOnScreen=(expense)=>
{
    const parentNode=document.getElementById('listOfExpenses')
    const childHTML=`<li id=${expense._id}> Expense Amount : ${expense.amount} Description : ${expense.description} Category : ${expense.category}
                    <button onclick=deleteExpense('${expense._id}')>Delete Expense </button>
                    <button onclick=editUser('${expense.amount}','${expense.description}','${expense.category}','${expense._id}')> Edit Expense</button>
                    `

    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

const deleteExpense=async(id)=>
{
    await axios.delete(`https://crudcrud.com/api/0e3660f902924cbba6b69cb8afc93449/expenseData/${id}`)
    deleteExpenseFromScreen(id)
}

const deleteExpenseFromScreen=(id)=>{
    const parentNode=document.getElementById('listOfExpenses');
    let nodeToBeDeleted=document.getElementById(id)

    parentNode.removeChild(nodeToBeDeleted);
}

const editUser=(amount,description,category,id)=>{
    document.getElementById('amount').value=amount
    document.getElementById('desc').value=description
    document.getElementById('category').value=category

    deleteExpense(id)
}
