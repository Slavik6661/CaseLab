import { getUsersData, getUserTodos } from "./api.js";
import { updateState } from "./globalState.js"
import todoList from "./todolist.js";
let todoListData = new todoList()
export default class userList {
  constructor() {
    this.divUsersList = document.querySelector("#user-todo")
    this.userList = []
  }

  async fetchUsersData() {
    let jsonUsers = await getUsersData()
    try {
      console.log(jsonUsers);
      jsonUsers.unshift({ name: '>>>> Rick Astley <<<<', id: 0 })

      jsonUsers.forEach((element, id) => {
        let option = document.createElement('option')
        option.id = element.id
        option.className = 'userName'
        option.value = element.id
        option.style.listStyleType = "none";
        option.appendChild(document.createTextNode(element.name));
        this.divUsersList.appendChild(option)
      });
    }
    catch (error) {
      console.error('An error occurred:', error);
    }

  }

  addEventListenerElements() {
    let userId
    let previousValue
    this.divUsersList.addEventListener('click', (e) => {
      userId = e.target.value
      if (userId !== previousValue) {
        console.log("Выбранное значение: " + userId);
        updateState('userId', userId);
        todoListData.fetchDataTodos()
        previousValue = userId;
      }
      else {
        console.log("Пользователь уже выбран.");
      }
    })
  }
}  