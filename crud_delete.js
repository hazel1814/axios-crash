function storage(e) {
    e.preventDefault();
    var amount = e.target.expense.value
    var description = e.target.description.value
    var category = e.target.category.value
    const obj = {
        amount,
        description,
        category
    }
    // localStorage.setItem(obj.description, JSON.stringify(obj))
   
        axios.post("https://crudcrud.com/api/41df90820acd427ca3ca90bfa2af66ae/applicationData",obj)
    .then((response) =>{
        console.log(response)
        show(response.data)
    }).catch((err) =>{
        document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
        console.log(err)
    })
} 

    window.addEventListener("DOMContentLoaded",() =>{
        axios.get("https://crudcrud.com/api/41df90820acd427ca3ca90bfa2af66ae/applicationData")
    .then((response) =>{
        for(var i=0;i<response.data.length;i++)
            show(response.data[i]) 
    }).catch((err) =>{
        document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
        console.log(err)
    })
    })


function show(item) {
    var items = document.getElementById('buttonid')
    var li = document.createElement('li')
    li.textContent = `${item.amount} - ${item.description} - ${item.category} `
    li.id=`${item._id}`

    var deletebtn = document.createElement('button')
    var editbtn = document.createElement('button')

    deletebtn.className = 'btn btn-outline-danger delete'
    editbtn.className = 'btn btn-outline-warning edit'

    deletebtn.appendChild(document.createTextNode('Delete Expense'));
    editbtn.appendChild(document.createTextNode('Edit Expense'));

    li.appendChild(deletebtn)
    li.appendChild(editbtn)


    //delete 
    deletebtn.onclick = () => {
        if (confirm('Are you Sure?')) {
            console.log(item.description)
            var id=li.id
            items.removeChild(li)
            axios.delete(`https://crudcrud.com/api/41df90820acd427ca3ca90bfa2af66ae/applicationData/${id}`)
    .then((response) =>{
        console.log(response)
    }).catch((err) =>{
        document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
        console.log(err)
    })
    
        }
    }


    //edit
    editbtn.onclick=() =>
    {
        // localStorage.removeItem(item.description)
        items.removeChild(li)
        var id=li.id
        document.getElementById('expenseamount').value=item.amount
        document.getElementById('expensedescription').value=item.description
        document.getElementById('expensecategory').value=item.category
        axios.delete(`https://crudcrud.com/api/41df90820acd427ca3ca90bfa2af66ae/applicationData/${id}`)
    .then((response) =>{
        console.log(response)
    }).catch((err) =>{
        document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
        console.log(err)
    })

    //     console.log(item.amount)
    //     var obj={
    //         amount:item.amount,
    //         description:item.description,
    //         category:item.category

    //     }
    //     axios.put(`https://crudcrud.com/api/41df90820acd427ca3ca90bfa2af66ae/applicationData/${id}`,obj)
    // .then((response) =>{
    //     console.log(response)
    // }).catch((err) =>{
    //     document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
    //     console.log(err)
    // })

    }
    items.appendChild(li)
}