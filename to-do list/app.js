import todoList from "./todolist.js";
import usersList from "./usersList.js"
let todoListData=new todoList()
let usersListData=new usersList()

usersListData.fetchUsersData()
usersListData.addEventListenerElements()
todoListData.addEventListenerBtnAddTask()


// let userNameList=document.querySelector('#user-todo')
// userNameList.addEventListener('click',(e)=>{
//     console.log(e.target.value);
// })

