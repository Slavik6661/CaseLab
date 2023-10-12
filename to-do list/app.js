
import usersList from "./usersList.js"

let usersListData=new usersList()
usersListData.fetchUsersData()
usersListData.addEventListenerElements()

// let userNameList=document.querySelector('#user-todo')
// userNameList.addEventListener('click',(e)=>{
//     console.log(e.target.value);
// })

