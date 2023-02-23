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

        let response=await axios.post('http://localhost:3000/user/add-expense',expense)
        showExpenseOnScreen(response.data.newExpense)
        await calculateExpense()
        
    }
    catch(e)
    {
        console.log(e)
    }
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        let response=await axios.get('http://localhost:3000/user/get-expense')

        for(let i=0;i<response.data.allExpense.length;i++)
        {
            console.log(response.data.allExpense[i])
            showExpenseOnScreen(response.data.allExpense[i])
        }
       await calculateExpense()
    }
    catch(e)
    {
        console.log(e)
    }
})



const showExpenseOnScreen=(expense)=>
{
    const parentNode=document.getElementById('listOfExpenses')
    const childHTML=`<li id=${expense.id}> Expense Amount : ${expense.amount} Description : ${expense.description} Category : ${expense.category}
                    <button onclick=deleteExpense('${expense.id}')>Delete Expense </button>
                    <button onclick=editUser('${expense.amount}','${expense.description}','${expense.category}','${expense.id}')> Edit Expense</button>
                    `

    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
const calculateExpense=async()=>{
    try{
        let response=await axios.get('http://localhost:3000/user/get-expense')
        let sum=0
        for(let i=0;i<response.data.allExpense.length;i++)
        {
            sum=sum+response.data.allExpense[i].amount

        }
        console.log(sum)
        showTotalExpense(sum)
    }
    catch(e)
    {
        console.log(e)
    }
}

const showTotalExpense=(sum)=>{
    const parentNode=document.getElementById('totalExpense')
    const childHTML=`<li>Total : ${sum}</li>`
    parentNode.innerHTML=childHTML

}
const deleteExpense=async(id)=>
{
    try{
    console.log(`to be deleted ${id}`)
    await axios.delete(`http://localhost:3000/user/delete-expense/${id}`)
    deleteExpenseFromScreen(id)
    await calculateExpense()
    }
    catch(e)
    {
        console.log(e)
    }
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
