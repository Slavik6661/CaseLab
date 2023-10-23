import todoList from "./todolist.js";
import usersList from "./usersList.js"
let todoListData = new todoList()
let usersListData = new usersList()

usersListData.fetchUsersData()
usersListData.addEventListenerElements()
todoListData.addEventListenerBtnAddTask()


