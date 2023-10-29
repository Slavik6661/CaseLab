import { getUsersData, getUserTodos, createUserApi } from "./api.js";
import { globalState, updateState } from "./globalState.js"
import todoList from "./todolist.js";
let todoListData = new todoList()
export default class userList {
  constructor() {
    this.divUsersList = document.querySelector("#user-todo")
    this.btnCreateUser = document.querySelector("#add-New-User")
    this.mainForm = document.querySelector("#main")
    this.modalIsVisible = false
    this.userList = []
  }

  async fetchUsersData() {
    let jsonUsers = await getUsersData()
    try {
      this.renderUsers(jsonUsers)
      updateState('userList', jsonUsers)
    }
    catch (error) {
      console.error('An error occurred:', error);
    }

  }

  renderUsers(jsonUsers) {
    this.divUsersList.innerHTML = ''
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

  addEventListenerElements() {
    let userId
    this.modalForm()
    this.divUsersList.onchange = (e) => {
      userId = e.target.value
      console.log("Выбранное значение: " + userId);
      updateState('userId', userId);
      todoListData.fetchDataTodos()
    }

    this.btnCreateUser.addEventListener('click', e => {
      this.modalIsVisible = !this.modalIsVisible
      console.log(this.modalIsVisible);
      let userForm = document.querySelector(".divform")
      this.modalIsVisible ? userForm.style.display = 'block' : userForm.style.display = 'none'
    })
  }

  async addNewUser() {
    let userName = document.getElementById('user-name').value;
    let user = await createUserApi(userName)
    console.log(user.id);
    let userList = globalState.get('userList')
    userList.push({ name: userName, id: userList.length + 1 })
    console.log('userList', userList);
    alert('пользователь успешно добавлен')
    this.renderUsers(userList)
  }
  modalForm() {
    let userForm = document.createElement('div')
    userForm.id = 'divForm'
    userForm.classList.add('divform')
    userForm.style.display = 'none'
    this.mainForm.appendChild(userForm)
    this.createInput('Имя:', 'text', 'name', true);
  }

  closeButton() {
    const closeButton = document.createElement('button');
    closeButton.id = 'btn-close'
    closeButton.classList.add('btn-close')
    closeButton.textContent = 'Закрыть';

    closeButton.onclick = () => {
      let userForm = document.querySelector(".divform")
      userForm.style.display = 'none'
      this.modalIsVisible = !this.modalIsVisible
    }
    return closeButton
  }

  addUserButton() {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'btn-add'
    submitButton.classList.add('btn-add')
    submitButton.textContent = 'Добавить';
    submitButton.onclick = () => {
      this.addNewUser()
    }
    return submitButton
  }

  createInput(labelText, inputType, inputName, isRequired) {
    let userForm = document.querySelector(".divform")

    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.id = 'user-name'
    input.name = inputName;
    if (isRequired) {
      input.required = true;
    }

    userForm.appendChild(label);
    userForm.appendChild(input);
    userForm.appendChild(document.createElement('br'));

    userForm.appendChild(this.addUserButton());
    userForm.appendChild(this.closeButton());
  }

}  